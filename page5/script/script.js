

$(document).ready(function() {

    // Affichage du background sur 100% de la hauteur
    $(".mainRow").css('height',0.9*$(window).height()+"px");

    // Détermination de la position du center
    let width=$(document).width();
    let height=$(document).height();
    let xcenter = width/2;
    let ycenter = height/2*0.82;
    // Détermination du rayon du cercle
    let r=height/2*0.6;
    // Détermination de la largeur d'une vignette
    let vignetteWidth=document.getElementById('vignette1').clientWidth;
    // Positionnement initial des vignettes
    positionVignettes();

    // FadeIn des vignettes
    let delay=4000;
    $('#vignette-item1').animate({opacity: '1'}, delay, 'linear', function(){});
    $('#vignette-item2').animate({opacity: '1'}, delay, 'linear', function(){});
    $('#vignette-item3').animate({opacity: '1'}, delay, 'linear', function(){});
    $('#vignette-item4').animate({opacity: '1'}, delay, 'linear', function(){});
    $('#vignette-item5').animate({opacity: '1'}, delay, 'linear', function(){});
    $('#vignette-item6').animate({opacity: '1'}, delay, 'linear', function(){});
    $('.name').animate({opacity: '1'}, delay, 'linear', function(){});

    // Mouvement circulaire
    let max=2;
    for(let j=0;j<max;j++){
        for(let i=0;i<100;i++){
            moveit('vignette1',2*Math.PI*i/100-Math.PI/2);
            moveit('vignette2',2*Math.PI*i/100-Math.PI/6);
            moveit('vignette3',2*Math.PI*i/100+Math.PI/6);
            moveit('vignette4',2*Math.PI*i/100+Math.PI/2);
            moveit('vignette5',2*Math.PI*i/100+5*Math.PI/6);
            moveit('vignette6',2*Math.PI*i/100+7*Math.PI/6);
        };
    }

    // Si changement de taille de fenêtre
    $(window).resize(function() {
        width = $(document).width();
        height = $(document).height();
        xcenter = width/2;
        ycenter = height/2*0.75;
        r=height/2*0.6;
        $(".mainRow").css('height',0.9*$(window).height()+"px");
        positionVignettes();
    });

    // <Détermination de la position des vignettes
    function positionVignettes(){
        let vignette1=document.getElementById('vignette1');
        vignette1.style.top=drawing(Math.PI/2)[0];
        vignette1.style.left=drawing(Math.PI/2)[1];

        let vignette2=document.getElementById('vignette2');
        vignette2.style.top=drawing(Math.PI/6)[0];
        vignette2.style.left=drawing(Math.PI/6)[1];

        let vignette3=document.getElementById('vignette3');
        vignette3.style.top=drawing(-Math.PI/6)[0];
        vignette3.style.left=drawing(-Math.PI/6)[1];

        let vignette4=document.getElementById('vignette4');
        vignette4.style.top=drawing(-Math.PI/2)[0];
        vignette4.style.left=drawing(-Math.PI/2)[1];

        let vignette5=document.getElementById('vignette5');
        vignette5.style.top=drawing(5*Math.PI/6)[0];
        vignette5.style.left=drawing(5*Math.PI/6)[1];

        let vignette6=document.getElementById('vignette6');
        vignette6.style.top=drawing(7*Math.PI/6)[0];
        vignette6.style.left=drawing(7*Math.PI/6)[1];
    }
    
    function drawing(teta){
        let top=Math.floor(ycenter-r*Math.sin(teta))*100/height+"%";
        let left=Math.floor(xcenter-vignetteWidth/2+r*Math.cos(teta))*100/width+"%";
        return [top, left];
    }
    
    // Remplissage aléatoire des vignettes (photo, target et titre)
    let wilders=["stephane", "zakaria", "hugo", "mathieu", "magali", "marion"];
    let wildersFullName=["Stéphane Guinot", "Zakaria Hamichi", "Hugo Hontans", "Mathieu Kanel", "Magali Klein", "Marion Koosinlin"];
    let j=1;
    while(wilders.length>0){
        // "Choice" of random wilder
        let i=Math.round(Math.random()*(wilders.length-1));
        // Selection of vignette
        let idvignette="#vignette-item"+j;
        // Selection of background-image
        //let bgImage="url('../image/"+wilders[i]+".jpg')";
        let bgImage="url('page5/image/"+wilders[i]+".jpg')";
        $(idvignette).css('background-image',bgImage);
        // Selection of background-image on hover
        let bgImageHover="url('page5/image/"+wilders[i]+"-chapeau.png')";
        $(idvignette).hover(function(){
            $(this).css('background-image',bgImageHover);
        },function() {
            $( this ).css('background-image',bgImage);
          }
        );
        // Selection of data target
        let dataTarget="#modal"+wilders[i];
        $(idvignette).attr('data-target',dataTarget);
        // Selction of name
        let titre="#titreVignette"+j;
        $(titre).text(wildersFullName[i]);

        // Removal of chosen wilder
        wilders.splice(i,1);
        wildersFullName.splice(i,1);

        // Incrementation of vignette number
        j++;
    }
    
    // Déplacement circulaire
    function moveit(id,t) {
        let newLeft = Math.floor(xcenter - vignetteWidth/2 + (r * Math.cos(t)));
        let newTop = Math.floor(ycenter + (r * Math.sin(t)));
        
        $("#"+id).animate({
            top: newTop,
            left: newLeft,
        }, 1)
    }
});