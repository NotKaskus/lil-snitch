import { HelpEmbedBuilder } from '#lib/structures/builders/HelpEmbedBuilder';
import { ModuleCommand } from '@kbotdev/plugin-modules';
import type { EmbedBuilder } from 'discord.js';
import type { Module } from '@kbotdev/plugin-modules';

export abstract class AkiraCommand<M extends Module> extends ModuleCommand<M> {
	public helpEmbed: EmbedBuilder;

	public constructor(context: AkiraCommand.Context, options: AkiraCommand.Options) {
		super(context, options);

		this.helpEmbed = options
			.helpEmbed(new HelpEmbedBuilder()) //
			.setDescription(this.description)
			.setType(this.supportsContextMenuCommands() ? 'Context-menu command' : 'Slash command')
			.build();
	}
}

export namespace AkiraCommand {
	export type Options = ModuleCommand.Options & {
		/**
		 * The description of the command.
		 */
		description: string;

		/**
		 * The data that will be shown when the help command is used.
		 */
		helpEmbed: (builder: HelpEmbedBuilder) => HelpEmbedBuilder;
	};

	export type Context = ModuleCommand.LoaderContext;
	export type ChatInputCommandInteraction = ModuleCommand.ChatInputCommandInteraction<'cached'>;
	export type ContextMenuCommandInteraction = ModuleCommand.ContextMenuCommandInteraction<'cached'>;
	export type AutocompleteInteraction = ModuleCommand.AutocompleteInteraction<'cached'>;
	export type Registry = ModuleCommand.Registry;
}