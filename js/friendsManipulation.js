var friendPhotos = function(id) {
    var photosStore = {};
    var displayGallery = function() {
        if (!photosStore.hasOwnProperty(id)) {
            photosStore[id] = FB.api('/' + id + '/photos', function(response) {
                if (response && response.data) {
                    photosStore[id] = response.data;
                    createGallery();
                } else {
                    console.log('Something goes wrong', response);
                }
            });
        } else {
            createGallery();
        }
    };
    var createGallery = function() {
        var listElem = document.getElementById('gallery-list');
        document.getElementsByClassName("activeImage")[0].innerHTML = "";
        listElem.innerHTML = "";
        if (photosStore[id].length > 0) {
            for (var iter in  photosStore[id]) {
                var childElem = document.createElement("li");
                var imgElem = document.createElement('img');
                imgElem.setAttribute('src', photosStore[id][iter].source);
                childElem.appendChild(imgElem);
                listElem.appendChild(childElem);
            }
            gallery.init();
        }
        else {
            console.log("no photos to share with you");
        }


    };
    return displayGallery();
};

var facebookFriends = function(friendData) {
    return {
        init: function() {
            var criteria = {
                name: document.getElementById("searchInput").value.toLowerCase()
            };
            var initList = friendsAction();
            var friends = localFriendsStore(friendData, 5);
            friends.search(criteria, initList.initList);
            var searchButton = document.getElementById("searchButton");
            searchButton.addEventListener("click", function() {
                criteria.name = document.getElementById("searchInput").value.toLowerCase();
                friends.search(criteria, initList.initList);
            });

            var searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("keyup", function() {
                criteria.name = document.getElementById("searchInput").value.toLowerCase();
                friends.search(criteria, initList.initList);
            });
        }
    };
};

function localFriendsStore(facebookData, maxResults) {
    var checkCriteria = function(friend, searchCriteria) {
        if (friend.toLowerCase().indexOf(searchCriteria) !== -1) {
            return true;
        }
        return false;
    };
    return {
        search: function(criteria, callback) {
            var myFriends = [], counter = 0;
            for (var currentCriteria in criteria) {
                for (var i = 0; i < facebookData.length; i++) {
                    var isRequestedFriend = false;
                    switch (criteria) {
                        case 'name':
                            {
                                isRequestedFriend = checkCriteria(facebookData[i].name, criteria[currentCriteria].trim());
                            }
                            break;
                        default:
                            {
                                isRequestedFriend = checkCriteria(facebookData[i].name, criteria[currentCriteria].trim());
                            }
                    }
                    if (isRequestedFriend) {
                        myFriends.push(facebookData[i]);
                        counter++;
                    }
                    if (counter === maxResults) {
                        break;
                    }
                }
            }
            callback(myFriends);
        }
    };
}

function friendsAction() {
    function onClick(friend) {
        return function() {
            var links = document.querySelectorAll(".friend-list a");
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                link.className = link.className.replace('selected', '');
            }

            this.setAttribute("class", "selected");
            document.getElementsByClassName("content-header")[0].children[0].textContent = "About " + friend.name;
            friendPhotos(friend.id);
            document.getElementsByClassName("friend-name")[0].textContent = friend.name;
            if (friend.location !== null && friend.location !== undefined) {
                document.getElementsByClassName("friend-location")[0].textContent = friend.location.name;
            }
            else {
                document.getElementsByClassName("friend-location")[0].textContent = "";
            }
        };
    }
    return{
        initList: function(allFriends) {
            if (document.getElementById("friend-list").children.length) {
                document.getElementById("friend-list").innerHTML = "";
            }
            if (!allFriends.length) {
                document.getElementById("friend-list").innerHTML = "No search results.";
            }
            else {
                for (var iter = 0; iter < allFriends.length; iter++) {
                    var friend = allFriends[iter];
                    var childElem = document.createElement("a");
                    childElem.setAttribute("id", "friend-" + iter);
                    childElem.textContent = friend.name;
                    document.getElementById("friend-list").appendChild(childElem);
                    childElem.addEventListener('click', onClick(friend));
                }
                document.getElementById("friend-0").click();
            }
        }
    };
}




/****************** Robert /
 
 (function() {
 var sectionContent = document.getSomething();
 $(sectionContent).on('click', '.sectionLink', function() {
 var thisSection = $(this).data("section");
 
 self.select(thisSection);
 });
 })();*/