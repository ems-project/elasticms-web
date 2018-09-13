const hashcashToken = require('hashcash-token');
const moment = require('moment');
const DELIMITER = "|"
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
        const target = form.getAttribute('data-hashcash');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // e.target.style.display = "none";

            const req = new XMLHttpRequest();

            const data = moment().format('YYMMDD')+DELIMITER+target;

            var token = hashcashToken.generate({
                    difficulty: 16384,
                    data: data
            });



            req.open('POST', e.target.getAttribute('action'), true);
            req.setRequestHeader('Content-type', 'application/json');
            req.overrideMimeType("application/json");
            req.setRequestHeader('X-Hashcash', [token.difficulty, token.data, token.nonce].join('|'));

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