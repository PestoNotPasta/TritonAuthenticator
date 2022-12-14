import { commandsList } from "../bot";
import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { errorEmbed } from "../utils/discord_helper";
import { handleModalSubmit } from "../commands/verification";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            await handleSlashCommand(client, interaction);
            return;
        }

        if(interaction.isModalSubmit()) {
            await handleModalSubmit(interaction);
            return;
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
    const command = commandsList.find((c) => c.name === interaction.command?.name);
    if (command) {
        command.handleCommand(client, interaction);
        return;
    }
    interaction.reply({ embeds: [errorEmbed] })
}