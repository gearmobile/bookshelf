window.addEventListener( 'DOMContentLoaded', function () {

    if ( localStorage ) {

        var bookShelfSave = document.querySelector( '#bookshelfSave' );
        var bookShelfEdit = document.querySelector( '#bookshelfEdit' );
        var bookShelfList = document.querySelector( '#bookShelfList' );

        var currentCardID; // manipulate current cards
        var counter = 1; // create new cards

        // function to clear all inputs
        function clearInputs() {
            document.querySelectorAll( '.form-control' ).forEach( function ( item ) {
                item.value = '';
            });
        }

        // function to save data -----------------
        function saveData() {
            var obj = {};
            document.querySelectorAll( '.form-control' ).forEach( function ( item ) {
                obj[ item.id ] = item.value;
            });
            localStorage.setItem( counter.toString(), JSON.stringify( obj ) );
            // generate card -------------------------------
            var card = document.createElement( 'li' );
            card.classList.add( 'card' );
            card.setAttribute( 'id', counter.toString() );
            bookShelfList.appendChild( card );
            card.insertAdjacentHTML( 'beforeEnd', '<h4 class="card-title">' + document.querySelector( '#bookshelfAuthor' ).value + '</h4>');
            card.insertAdjacentHTML( 'beforeEnd', '<h6 class="card-subtitle">' + document.querySelector( '#bookshelfTitle' ).value + '</h6>');
            card.insertAdjacentHTML( 'beforeEnd', '<button class="card-edit pull-left btn btn-primary" role="button">edit</button>');
            card.insertAdjacentHTML( 'beforeEnd', '<button class="card-remove pull-right btn btn-danger" role="button">remove</button>');
            counter++;
            clearInputs();
        }

        // save data --------------
        bookShelfSave.addEventListener( 'click', function ( event ) {
            event.preventDefault();
            saveData();
        }, false );

        // remove card ------------------
        bookShelfList.addEventListener( 'click', function ( event ) {
            if ( event && event.target.classList.contains( 'card-remove' ) ) {
                var currentItem = event.target.parentNode;
                localStorage.removeItem( currentItem.getAttribute( 'id' ) );
                currentItem.parentNode.removeChild( currentItem );
            }
        }, false );

        // load data ------------------
        bookShelfList.addEventListener( 'click', function ( event ) {
            if ( event && event.target.classList.contains( 'card-edit' ) ) {
                var currentItem = event.target.parentNode;
                currentCardID = currentItem.getAttribute( 'id' );
                var currentObj = JSON.parse( localStorage.getItem( currentCardID ) );
                document.querySelectorAll( '.form-control' ).forEach( function ( item ) {
                    item.value = currentObj[ item.id ];
                });
                bookShelfEdit.style.display = 'block';
            }
        }, false );

        // edit data ---------------------
        bookShelfEdit.addEventListener( 'click', function () {
            var currentCard = document.getElementById( currentCardID );
            document.querySelectorAll( '.form-control' ).forEach( function ( item ) {
                if ( item.id === 'bookshelfAuthor' ) {
                    currentCard.childNodes[0].innerHTML = item.value;
                }
                if ( item.id === 'bookshelfTitle' ) {
                    currentCard.childNodes[1].innerHTML = item.value;
                }
            });
            var obj = {};
            document.querySelectorAll( '.form-control' ).forEach( function ( item ) {
                obj[ item.id ] = item.value;
            });
            localStorage.setItem( currentCardID, JSON.stringify( obj ) );
            bookShelfEdit.style.display = 'none';
            clearInputs();
        });

        // load init -------------------------
        function storageInit() {
            for ( var key in localStorage ) {
                var currObject = JSON.parse( localStorage[ key ] );
                // generate card -------------------------------
                var card = document.createElement( 'li' );
                card.classList.add( 'card' );
                card.setAttribute( 'id', key );
                bookShelfList.appendChild( card );
                card.insertAdjacentHTML( 'beforeEnd', '<h4 class="card-title">' + currObject[ 'bookshelfAuthor' ] + '</h4>');
                card.insertAdjacentHTML( 'beforeEnd', '<h6 class="card-subtitle">' + currObject[ 'bookshelfTitle' ] + '</h6>');
                card.insertAdjacentHTML( 'beforeEnd', '<button class="card-edit pull-left btn btn-primary" role="button">edit</button>');
                card.insertAdjacentHTML( 'beforeEnd', '<button class="card-remove pull-right btn btn-danger" role="button">remove</button>');
            }
        }

        // generate current cards on page load -------------------
        storageInit();
    }
});
