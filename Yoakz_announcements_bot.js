const Discord = require('discord.js');
const {
    prefix,
    command,
    token
} = require('./config.json');
const client = new Discord.Client();
console.log('\n▒█▀▀█ ░▀░ ▀▀█▀▀ █▀▀ █▀▀█ ░▀░ █▀▀▄ ▒█░░▒█ ░▀░ █▀▀█ █░░█ █▀▀ \n▒█▀▀▄ ▀█▀ ░░█░░ █░░ █░░█ ▀█▀ █░░█ ░▒█▒█░ ▀█▀ █▄▄▀ █░░█ ▀▀█ \n▒█▄▄█ ▀▀▀ ░░▀░░ ▀▀▀ ▀▀▀▀ ▀▀▀ ▀░░▀ ░░▀▄▀░ ▀▀▀ ▀░▀▀ ░▀▀▀ ▀▀▀ \n');
client.once('ready', () => {
console.log(`If code breaks; copy the following example into "embed.txt"\n-----------------------------------------------------------------------------\n{\n	"title": "titlsssss",\n	"description	": "my description",\n	"side_color": "12331890",\n	"footer_icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",\n	"footer_text": "footer_text",\n	"rightside_icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",\n	"big_image_thumbnail_url": "https://cdn.discordapp.com/embed/avatars/0.png",\n	"author_name": "author_naaaame",\n	"top_left_user_icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",\n	"field_1": "field_1",\n	"value_1": "value_1",	\n}\n-----------------------------------------------------------------------------\n\n\nDisclaimers:\nAll images are optional and should be left with NO spaces within the quotations.\nAll "text" fields are required to have text.\nOnly people with a role with ADMINISTRATOR access can do "${prefix}${command}".\nAny link put in must be "https://" not "http://"`);
});
const fs = require('fs')
function stringPosition(needle, haystack) {
    for (var j = 0; j < haystack.length; j++) {
        for (var i = 0; i < needle.length; i++) {
            if (needle[i] !== haystack[i + j]) {
                break;
            }
            if (i === needle.length - 1) {
                return j + needle.length;
            }
        }
    }
}
function parse(pull) {
    delete(matches)
    var settings = fs.readFileSync("./enbed.txt", {
        "encoding": "utf-8"
    });
    var matches = settings.match(RegExp(`(${pull}).{1,}(",)`));
    return settings.slice(stringPosition(pull, settings) + 4, -pull.length - 2 + stringPosition(pull, settings) + matches[0].length);
}
client.on('message', message => {
    if (message.content.startsWith(prefix + command)) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            var embed = {
                "title": `${parse("title")}`,
                "description": `${parse("description")}`,
                "color": `${parse("side_color")}`,
                "footer": {
                    "icon_url": `${parse("footer_icon_url")}`,
                    "text": `${parse("footer_text")}`
                },
                "thumbnail": {
                    "url": `${parse("rightside_icon_url")}`
                },
                "image": {
                    "url": `${parse("big_image_thumbnail_url")}`
                },
                "author": {
                    "name": `${parse("author_name")}`,
                    "icon_url": `${parse("top_left_user_icon_url")}`
                },
                "fields": [{
                    "name": `${parse("field_1")}`,
                    "value": `${parse("value_1")}`
                }]
            };
			message.delete(500);
            message.channel.send({
                embed
            });
        }
    }
});
client.login(token);
