/**
 *
 */
export default function hashcash() {
    function toJSONString( form ) {
        var obj = {};
        var elements = form.querySelectorAll( "input, select, textarea" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
                obj[ name ] = value;
            }
        }

        return JSON.stringify( obj );
    }




    console.log('Hashcash is initializing forms');
    const forms = document.querySelectorAll('form[data-hashcash]');
    for (const form of forms) {
        // console.log(form);
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // e.target.style.display = "none";

            const req = new XMLHttpRequest();
            // console.log(hasha('unicorn'));

            req.open('POST', e.target.getAttribute('action'), true);
            req.setRequestHeader('Content-type', 'application/json');
            req.overrideMimeType("application/json");
            req.setRequestHeader('X-Hashcash', '1:20:060408:destinataire@example.org::1QTjaYd7niiQA/sc:ePa');

            req.addEventListener("progress", function(evt) {
                console.log('progress');
            }, false);
            req.addEventListener("load", function(evt) {
                const jsonResponse = JSON.parse(req.responseText);
                alert('Your submit id: '+jsonResponse.submit_id);
            }, false);
            req.addEventListener("error", function(evt) {
                alert('error');
            }, false);


            req.send(toJSONString(e.target));




        }, false);
    }

}