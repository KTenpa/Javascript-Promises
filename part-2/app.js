


    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // 1
    $.getJSON(`${baseURL}/new/draw/`)
        .then(data => {
            let { suit, value } = data.cards[0];
            console.log(`${value} of ${suit}`);
        });


    // 2
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`)
        .then(data => {
            firstCard = data.cards[0];
            let deckId = data.deck_id;
            return $.getJSON(`${baseURL}/${deckId}/draw/`)
        })
        .then(data => {
            let secondCard = data.cards[0];
            [firstCard, secondCard].forEach(card => {
                console.log(`${card.value} of ${card.suit}`);
            });
        });


    // 3
    let $btn = $('button');
    let $cards = $('#cards');
    let deckId = null;

    $.getJSON(`${baseURL}/new/shuffle/`)
    .then(data => {
        deckId = data.deck_id;
        $btn.show();
    })

    $btn.on('click', function(){
        $.getJSON(`${baseURL}/${deckId}/draw/`)
            .then(data => {
                let cardSrc = data.cards[0].image;
                $cards.append(
                    $('<img>', {
                        src: cardSrc
                    })
                );
                if (data.remaining === 0) $btn.remove();
            });
        });
    