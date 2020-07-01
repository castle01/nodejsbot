const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "안녕하세요";
const welcomeChannelComment = "어서오세요.";


client.on('ready', () => {
  console.log('ON!');
  client.user.setPresence({ game: { name: '그대들을 감시' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "Guest"));
});


client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pooooooooooooooooooooooooooooooong');
  }

  if(message.content == '!안녕') {
    let img = 'https://postfiles.pstatic.net/MjAyMDA3MDFfMTQy/MDAxNTkzNjA1ODM3OTc1.iss6xrMgqmoGpk_Avzi-tnJtBo27IdrqIjZ-B51REEIg.Ojt1AwMxbo8-vj9wLdsXle0m7KD7HosfMIy1uJ6xOEsg.PNG.wnrehqhd1/DNDNDNDN_04.png?type=w580';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('http://www.naver.com')
      .setAuthor('HUKA', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('Inline field title', 'Some value here')
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('보고만듬', img)

    message.channel.send(embed)
  } else if(message.content == '!help') {
    let helpImg = 'https://i.ytimg.com/vi/uTHYIEN2ayg/hqdefault.jpg';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태-사실헛소리'},
      {name: '!안녕', desc: '안녕'},
      {name: '!help', desc: 'help'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of HUKA BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`HUKA BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

});


function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);