var header = document.getElementById('header');
var top_icon = document.getElementById('top-icon');
var hero = document.getElementById('hero');
var grid = document.getElementById('grid');
var hero_end = document.getElementById('end-scroll');
var watchButton = document.getElementById('watch-button');
var bottom_menu = document.getElementById('bottom-menu');
var cards = document.getElementsByClassName('card');
var cards_to_load = [];
for(var i = 0; i < cards.length; i++)
    cards_to_load.push(cards[i]);
var hero_maw, hero_miw, hero_mah, hero_mih, startH, endH, ds, dw, dh;
updateHeroSize()
lazyLoad();
window.addEventListener('resize', function () {
    updateHeroSize()
});
var prev_scroll = 0;
window.addEventListener('scroll', function () {
    // hero minimize
    var s = window.pageYOffset;
    var w = hero_maw - (dw * s) / ds;
    var h = hero_mah - (dh * s ) / ds;
    hero.style.width = w + 'px';
    hero.style.height = h + 'px';
    hero.style.marginTop = (hero_mah - h) + 'px';

    // Button disable
    if(s >= getFullOffset(watchButton))
        watchButton.disabled = true;
    else
        watchButton.disabled = false;

    // Header and top-icon show/hide
    var scrolled = window.scrollY;
    if(scrolled > getFullOffset(hero_end) && scrolled > prev_scroll)
    {
        header.classList.add('out')
        top_icon.classList.remove('visible');
        
        if(bottom_menu.offsetTop == 7)
            bottom_menu.classList.add('invisible')
    }
    else
    {
        header.classList.remove('out')
        if(scrolled > getFullOffset(hero_end))
            top_icon.classList.add('visible');
        else
            top_icon.classList.remove('visible');
        
        if(bottom_menu.offsetTop == 7)
            bottom_menu.classList.remove('invisible')
    }
    prev_scroll = scrolled;

    // lazy load
    lazyLoad();
});
function lazyLoad(){
    var cards_to_delete = [];
    cards_to_load.forEach(card => {
        if( (window.pageYOffset + window.innerHeight) > getFullOffset(card))
        {
            if(card.classList.contains('card-wide'))
            {
                var video = card.getElementsByClassName('card-wide__video')[0];
                cards_to_delete.push(card);
                video.setAttribute('poster', video.getAttribute('data-poster'));
                return;
            }
            var image = card.getElementsByClassName('card_image__img')[0];
            cards_to_delete.push(card);
            image.setAttribute('srcset', image.getAttribute('src'));
        }
    });
    cards_to_delete.forEach(card => {
        cards_to_load.splice(cards_to_load.indexOf(card),1)
    });
}
function getFullOffset(elem) {
    var top=0;
    while(elem) {
        top = top + parseFloat(elem.offsetTop);
        elem = elem.offsetParent;
    }
    return Math.round(top);
}
function updateHeroSize(){
    hero.style.width = 'auto';
    hero.style.height = 'auto';
    hero_maw = hero.offsetWidth;
    hero_miw = hero.offsetWidth - 20;
    hero_mah = hero.offsetHeight;
    hero_mih = hero.offsetHeight - 20;
    ds = getFullOffset(hero_end) - getFullOffset(hero);
    dw = hero_maw - hero_miw;
    dh = hero_mah - hero_mih;

    // Grid margin top
    grid.style.paddingTop = hero_mah + 'px';
}