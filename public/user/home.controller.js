(function () {
    angular
        .module('Viddy')
        .controller('HomeController', HomeController);

    function HomeController($rootScope, $sce, PostService, CommentService, $filter, $window, youtubeEmbedUtils) {
        var vm = this;
        var id = $rootScope.currentUser._id;
        vm.post = {};
        vm.msg = {}
        vm.createPost = createPost;
        vm.createComment = createComment;
        vm.getSafeUrl = getSafeUrl;
        vm.getDate = getDate;
        vm.like = like;
        vm.deletePost = deletePost;
        vm.liked = liked;

        function init() {
            if ($rootScope.video) {
                vm.post.text = vm.getSafeUrl($rootScope.video).toString();
                $rootScope.video = null;
            }
            PostService
                .findPostForUser(id)
                .then(function (posts) {
                    vm.posts = posts;
                }, function (err) {
                    vm.msg = {type: 'error', text: 'Error loading posts'};
                });
        }

        init();



        function createPost(post) {
            vm.msg = null
            var temp = post.text;
            var link = $filter('parseUrl')(temp);
            if (link.length) {
                post.link = youtubeEmbedUtils.getIdFromURL(link[0]);
                post.text = post.text.b || post.text ? $filter('replaceUrl')(post.text) : null;
                if (!post.link && !post.text) {
                    return;
                }
                PostService.createPost(id, post)
                    .then(function (post) {
                        if (post) {
                            PostService.findPostById(id, post._id)
                                .then(function (post) {
                                    vm.posts.push(post);
                                    vm.post = null;

                                }, function () {
                                    init();
                                });
                        }
                    }, function (err) {
                        vm.msg = {type: 'error', text: 'Error creating post,try again'};
                    });
            }
            else {
                vm.msg = {type: 'error'};
            }

        }

        function createComment(post) {
            if (vm.comment) {
                CommentService
                    .createComment(id, post._id, vm.comment)
                    .then(function (comment) {
                        CommentService
                            .findCommentById(id, post._id, comment._id)
                            .then(function (comment) {
                                var i;
                                for (var p in vm.posts) {
                                    if (vm.posts[p]._id === post._id) {
                                        i = p;
                                    }
                                }
                                vm.posts[i].comments.push(comment);
                                vm.comment = {};
                            });
                    });


            }
        }
        function like(post) {
            var postId = post._id;
            var value = !vm.liked(post);
            PostService.likePost(id, postId, value)
                .then(function (post) {
                    var i = -1;
                    for (var p in vm.posts) {
                        if (vm.posts[p]._id === postId) {
                            i = p;
                        }
                    }
                    if (value) {
                        vm.posts[i].likes.push(id);

                    }
                    else {
                        vm.posts[i].likes = _.without(vm.posts[i].likes, id);
                    }
                });
        }

        function liked(post) {
            return (post.likes.indexOf(id) === -1) ? false : true;
        }
        function deletePost(postId) {
            var choice = $window.confirm('Are you sure you want to delete?');
            if (choice) {
                PostService.deletePost(postId, id)
                    .then(function () {
                        vm.posts = _.without(vm.posts, _.findWhere(vm.posts, {_id: postId}));
                    });
            }
        }

        function getSafeUrl(yUrl) {
            var url = 'https://www.youtube.com/embed/' + yUrl;
            return $sce.trustAsResourceUrl(url);

        }

        function getDate(date) {
            return $window.moment() < $window.moment(date).add(22, 'hours') ? 'today' : $window.moment(date).from($window.moment());
        }
    }

})();