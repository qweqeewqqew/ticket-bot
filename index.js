const Discord = require("discord.js");
const { Intents, Collection } = Discord;
const client = new Discord.Client({ intents: 32767 });
const db = require("nrc.db");
require("discord-reply");

const { token, owners } = require("./config.json");

client.commands = new Collection();
client.slashCommands = new Collection();

require("./handlers/Commands.js")(client);
require("./handlers/Events.js")(client);

client.on('guildMemberAdd', async member => {
		member.roles.add("KAYITSIZ ROLÜ ID")
        const embed = new Discord.MessageEmbed()
        .setColor(`000cff`)
        .setDescription(`**👋 Sunucumuza hoş geldin ${member}\n\n🙌 Seninle birlikte ${member.guild.memberCount} kişiyiz.\n\n💫 Kayıt olmak için yetkilileri beklemen yeterlidir.**`)
		.setThumbnail(member.user.avatarURL({dynamic: true}))
		.setFooter({text: member.guild.name, iconURL: member.guild.iconURL({dynamic: true})})
        client.channels.cache.get("Kayıt Log Kanalı").send({content: `> ${member} **sunucuya giriş yaptı.**`,embeds: [embed]})
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
	// Kayıt
	if(interaction.customId === "GurluErkek"){
		if(interaction.member.roles.cache.has("Yetkili Rol ID") || interaction.member.permissions.has("ADMINISTRATOR")) {
			if(!interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`))){
				const erkekEmbed = new Discord.MessageEmbed()
				.setColor("RED")
				.setDescription(`Üye sunucudan ayrıldığı için kayıt iptal edildi.`)			
				interaction.update({embeds: [erkekEmbed], components: []});
				db.delete(`üye_${interaction.message.id}`)
			}else{
				interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`)).roles.remove("KAYITSIZ ROLÜ ID")
				interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`)).roles.add("Erkek Rolü ID")
				const erkekEmbed = new Discord.MessageEmbed()
				.setColor("GREEN")
				.setDescription(`${interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`))} kişisi erkek olarak kayıt edildi.`)
				interaction.update({embeds: [erkekEmbed], components: []});
				db.delete(`üye_${interaction.message.id}`)
			}
		}else{interaction.reply({content: "Kayıt yetkiniz olmadığı için bu işlemi gerçekleştiremezsiniz.", ephemeral: true})}
	}
	if(interaction.customId === "GurluKadın"){
		if(interaction.member.roles.cache.has("Yetkili Rol ID") || interaction.member.permissions.has("ADMINISTRATOR")) {
			if(!interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`))){
				const kadınEmbed = new Discord.MessageEmbed()
				.setColor("RED")
				.setDescription(`Üye sunucudan ayrıldığı için kayıt iptal edildi.`)			
				interaction.update({embeds: [kadınEmbed], components: []});
				db.delete(`üye_${interaction.message.id}`)
			}else{
				interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`)).roles.remove("KAYITSIZ ROLÜ ID")
				interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`)).roles.add("Kadın Rolü ID")
				const kadınEmbed = new Discord.MessageEmbed()
				.setColor("GREEN")
				.setDescription(`${interaction.message.guild.members.cache.get(db.fetch(`üye_${interaction.message.id}`))} kişisi kadın olarak kayıt edildi.`)
				interaction.update({embeds: [kadınEmbed], components: []});
				db.delete(`üye_${interaction.message.id}`)
			}
		}else{interaction.reply({content: "Kayıt yetkiniz olmadığı için bu işlemi gerçekleştiremezsiniz.", ephemeral: true})}			
	}
	// Kayıt
});


client.login(token).catch((error) =>
	console.error("Lütfen tokeni doğru biçimde girin!\n\n" + error)
);

Promise.prototype.del = (ms) => {
  if (this)
    this.then((m) => {
      if (m.deletable) setTimeout(() => m.delete(), Number(ms));
    });
};

process.on("uncaughtException", (err) => console.error(err.stack));
process.on("unhandledRejection", (err) => console.error(err.stack));
