const recon = require("reconlx");
const Discord = require('discord.js');
// Destructure the package
const ReactionPages = recon.ReactionPages
module.exports.run = async (client, message, args) => {
const embed1 = new Discord.MessageEmbed()
    .setDescription(`af : Afrikaans,\n
    sq: Albanian,\n
    am: Amharic, \n
    ar: Arabic, \n
    hy: Armenian,\n
    az: Azerbaijani,\n
    eu: Basque,\n
    be: Belarusian,\n
    bn: Bengali,\n
    bs: Bosnian,\n
    bg: Bulgarian,\n
    ca: Catalan,\n
    ceb: Cebuano,\n
    ny: Chichewa,\n
    zh-CN: Chinese (Simplified),\n
    zh-TW: Chinese (Traditional),\n
    co: Corsican,\n
    hr: Croatian,\n
    cs: Czech,\n
    da: Danish,\n
    nl: Dutch,\n
    en: English,\n
    eo: Esperanto,\n
    et: Estonian,\n
    tl: Filipino,\n
    fi: Finnish,\n
    fr: French,\n
    fy: Frisian,\n
    gl: Galician,\n
    ka: Georgian,\n
    de: German,\n
    el: Greek \n
    gu: Gujarati`)
    .setColor("RANDOM")
    const embed2 = new Discord.MessageEmbed()
    .setDescription(`ht: Haitian Creole,
    ha: Hausa,\n
    haw: Hawaiian,\n
    he: Hebrew,\n
    iw: Hebrew,\n
    hi: Hindi,\n
    hmn: Hmong,\n
    hu: Hungarian,\n
    is: Icelandic,\n
    ig: Igbo,\n
    id: Indonesian,\n
    ga: Irish,\n
    it: Italian,\n
    ja: Japanese,\n
    jw: Javanese,\n
    kn: Kannada,\n
    kk: Kazakh,\n
    km: Khmer,\n
    ko: Korean,\n
    ku: Kurdish (Kurmanji),\n
    ky: Kyrgyz,\n
    lo: Lao,\n
    la: Latin,\n
    lv: Latvian,\n
    lt: Lithuanian,\n
    lb: Luxembourgish,\n
    mk: Macedonian,\n
    mg: Malagasy,\n
    ms: Malay,\n
    ml: Malayalam,\n
    mt: Maltese,\n
    mi: Maori,\n
    mr: Marathi,\n
    mn: Mongolian,\n
    my: Myanmar (Burmese),\n
    ne: Nepali,\n
    no: Norwegian,\n
    ps: Pashto,\n
    fa: Persian,\n
    pl: Polish,\n
    pt: Portuguese,\n
    pa: Punjabi,\n
    ro: Romanian,\n
    ru: Russian,\n
    sm: Samoan,\n
    gd: Scots Gaelic,\n
    sr: Serbian,\n
    st: Sesotho,\n
    sn: Shona,\n
    sd: Sindhi,\n
    si: Sinhala,\n
    sk: Slovak,\n
    sl: Slovenian,\n
    so: Somali,\n
    es: Spanish,\n
    su: Sundanese,\n
    sw: Swahili,\n
    sv: Swedish,\n
    tg: Tajik,\n
    ta: Tamil,\n
    te: Telugu,\n
    th: Thai,\n
    tr: Turkish,\n
    uk: Ukrainian,\n
    ur: Urdu,\n
    uz: Uzbek,\n
    vi: Vietnamese,\n
    cy: Welsh,\n
    xh: Xhosa,\n
    yi: Yiddish,\n
    yo: Yoruba,\n
    zu: Zulu\n
};`)
.setColor("RANDOM")
    const pages = [embed1, embed2];
// Change pages when sending numbers.
const textPageChange = true;
// Create an emojilist, first emoji being page back and second emoji being page front. Defaults are set to  [⏪, ⏩].
const emojis = ["⏪", "⏩"];
// Define a time in ms, defaults are set to 60000ms which is 60 seconds. Time on how long you want the embed to be interactable
const time = 30000;
// Call the ReactionPages method, use the <message> parameter to initialize it.
ReactionPages(message, pages, textPageChange, emojis, time);
} 
module.exports.config = {
	name: 'lang_list',
	aliases: [],
	description: 'This is the language list for translate command',
}; 