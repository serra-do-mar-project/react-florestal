ALTER TABLE `users_table` RENAME TO `infracoes_table`;--> statement-breakpoint
ALTER TABLE `infracoes_table` RENAME COLUMN "name" TO "nome_resumo";--> statement-breakpoint
ALTER TABLE `infracoes_table` RENAME COLUMN "age" TO "nome_compelto";--> statement-breakpoint
ALTER TABLE `infracoes_table` RENAME COLUMN "email" TO "palavra_chave";--> statement-breakpoint
DROP INDEX `users_table_email_unique`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_infracoes_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome_resumo` text NOT NULL,
	`nome_compelto` text NOT NULL,
	`palavra_chave` text NOT NULL,
	`categoria` text NOT NULL,
	`tags` text,
	`exemplo` text NOT NULL,
	`definição` text NOT NULL,
	`proc_OP` text NOT NULL,
	`proc_ADM` text NOT NULL,
	`enquad_PEN` text NOT NULL,
	`enquad_ADM` text NOT NULL,
	`formulario` text NOT NULL,
	`tipo_ocorrencia` text NOT NULL,
	`campos` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_infracoes_table`("id", "nome_resumo", "nome_compelto", "palavra_chave", "categoria", "tags", "exemplo", "definição", "proc_OP", "proc_ADM", "enquad_PEN", "enquad_ADM", "formulario", "tipo_ocorrencia", "campos") SELECT "id", "nome_resumo", "nome_compelto", "palavra_chave", "categoria", "tags", "exemplo", "definição", "proc_OP", "proc_ADM", "enquad_PEN", "enquad_ADM", "formulario", "tipo_ocorrencia", "campos" FROM `infracoes_table`;--> statement-breakpoint
DROP TABLE `infracoes_table`;--> statement-breakpoint
ALTER TABLE `__new_infracoes_table` RENAME TO `infracoes_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;