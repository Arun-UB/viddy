(function () {
    'use strict';
    angular
        .module('Viddy')
        .factory('PostService', PostService);

    function PostService($http) {
        var api = {
            createPost: createPost,
            findPostForUser: findPostForUser,
            findPostById: findPostById,
            getUserPosts: getUserPosts,
            getPosts: getPosts,
            likePost: likePost,
            updatePost: updatePost,
            deletePost: deletePost
        };

        return api;

        function createPost(userId, newPost) {
            return $http.post('/project/api/user/' + userId + '/post', {newPost: newPost})
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function findPostForUser(userId) {  
            return $http.get('/project/api/user/' + userId + '/post', userId)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function findPostById(userId, postId) {
            return $http.get('/project/api/user/' + userId + '/post/' + postId)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function getUserPosts(userId) {
            return $http.get('/project/api/user/' + userId + '/posts')
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }
        function getPosts() {
            return $http.get('/project/api/posts')
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }
        function likePost(userId, postId, value) {
            return $http.put('/project/api/user/' + userId + '/post/' + postId + '/like', {value: value})
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function updatePost(newPost, postId, userId) {
            return $http.put('/project/api/user/' + userId + '/post/' + postId, newPost)
                .then(function (response) {
                    return response.data;
                });

        }
        function deletePost(postId, userId) {
            return $http.delete('/project/api/user/' + userId + '/post/' + postId)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();