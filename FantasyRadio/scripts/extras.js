document.addEventListener("DOMContentLoaded", function() {
    // =============================================================
    //           INITIALIZE FIREBASE FOR VISITOR & LIKE COUNTS
    // =============================================================
    // Replace the values below with your Firebase project configuration.
    var firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    // Initialize Firebase if it hasn't been initialized already
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var db = firebase.firestore();

    // =============================================================
    //           EXTRAS MODAL: COMMENTS, LIKES & DONATION
    // =============================================================
    const extrasBtn = document.getElementById("extras-btn");
    const extrasModal = document.getElementById("extras-modal");
    const closeExtras = document.querySelector(".close-extras");

    // When the extras button is clicked, show the extras modal
    extrasBtn.addEventListener("click", function() {
        extrasModal.style.display = "block";
        updateVisitorCount();
        loadLikeCount();
    });

    // When the close button is clicked, hide the extras modal
    closeExtras.addEventListener("click", function() {
        extrasModal.style.display = "none";
    });

    // Hide modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === extrasModal) {
            extrasModal.style.display = "none";
        }
    });

    // =============================================================
    //           UPDATE & Retrieve Visitor Count from Firestore
    // =============================================================
    function updateVisitorCount() {
        var visitorRef = db.collection("metrics").doc("visitorCount");
        visitorRef.get().then(function(doc) {
            if (doc.exists) {
                visitorRef.update({
                    count: firebase.firestore.FieldValue.increment(1)
                }).then(function() {
                    visitorRef.get().then(function(updatedDoc) {
                        document.getElementById("visitor-number").textContent = updatedDoc.data().count;
                    });
                });
            } else {
                visitorRef.set({ count: 1 }).then(function() {
                    document.getElementById("visitor-number").textContent = 1;
                });
            }
        }).catch(function(error) {
            console.log("Error updating visitor count:", error);
        });
    }

    // =============================================================
    //           Load Global Like Count from Firestore
    // =============================================================
    function loadLikeCount() {
        var likeRef = db.collection("metrics").doc("likeCount");
        likeRef.get().then(function(doc) {
            if (doc.exists) {
                document.getElementById("like-count").textContent = doc.data().count;
            } else {
                likeRef.set({ count: 0 }).then(function() {
                    document.getElementById("like-count").textContent = 0;
                });
            }
        }).catch(function(error) {
            console.log("Error loading like count:", error);
        });
    }

    // =============================================================
    //           Like Button Functionality: Update Global Like Count
    // =============================================================
    const likeBtn = document.getElementById("like-btn");
    likeBtn.addEventListener("click", function() {
        var likeRef = db.collection("metrics").doc("likeCount");
        likeRef.update({
            count: firebase.firestore.FieldValue.increment(1)
        }).then(function() {
            likeRef.get().then(function(doc) {
                document.getElementById("like-count").textContent = doc.data().count;
            });
        }).catch(function(error) {
            console.log("Error updating like count:", error);
        });
    });
});