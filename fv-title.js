// Char sets for each font variant
// Supported variants:
// r Regular
// b Bold
// i Italic
// bi Bold Italic

// Basic characters to map Unicode characters
map_chars   = runes( "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" );

// Unicode characters
r_chars     = runes( "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫" );
b_chars     = runes( "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵" );
i_chars     = runes( "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘦𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫" );
bi_chars    = runes( "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵" );

// Building characters structure based on available font variants
chars = {};

for ( var index = 0; index < map_chars.length; index ++ ) {
  chars[ map_chars[ index ] ] = {
    "r":  r_chars[ index ],
    "b":  b_chars[ index ],
    "i":  i_chars[ index ],
    "bi": bi_chars[ index ],
  }
}

// Variants:
// "b"  bold
// "i"  italic
// "bi" bold italic

function fv_format( str, variant ) {

  variant = ( variant == null || variant != "b" && variant != "i" && variant != "bi" ) ? "r" : variant;
  var out = "";
  for ( var index = 0; index < str.length; index++ ) {
    out += !( str.charAt( index ) in chars ) ? str.charAt( index ) : chars[ str.charAt( index ) ][ variant ];
  }
  return out;
}

// Parse for
// <b></b> Bold
// </i></i> Italic
// <bi></bi> Bold Italic
function fv_parse( str ){

  // Parse Bold
  var b_tag = /<b>(.*?)<\/b>/g;
  var b_content = /<b>(.*?)<\/b>/;
  str = str.replace(b_tag,  function( tag ){ return fv_format( tag.match(b_content )[ 1 ], "b") ;} );

  // Parse Italic
  var i_tag = /<i>(.*?)<\/i>/g;
  var i_content = /<i>(.*?)<\/i>/;
  str = str.replace(i_tag,  function( tag ){ return fv_format( tag.match(i_content )[ 1 ], "i") ;} );

  // Parse Bold Italic
  var bi_tag = /<bi>(.*?)<\/bi>/g;
  var bi_content = /<bi>(.*?)<\/bi>/;

  // Replace all regular fonts to regular variant
  str = str.replace(bi_tag,  function( tag ){ return fv_format( tag.match(bi_content )[ 1 ], "bi") ;} );

return fv_format( str );
}

// Requires jQuery to work
function fv_start() {
  $('*[fv-title]').each( function(){
    $( this ).attr( 'title', fv_parse( $( this ).attr( 'fv-title' ) ) );
  });
}
