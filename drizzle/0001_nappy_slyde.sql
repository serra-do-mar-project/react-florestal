PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_autos_de_infracao_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome_resumo` text NOT NULL,
	`tags` text,
	`modelo` text NOT NULL,
	`data` text NOT NULL,
	`categoria` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_autos_de_infracao_table`("id", "nome_resumo", "tags", "modelo", "data", "categoria") SELECT "id", "nome_resumo", "tags", "modelo", "data", "categoria" FROM `autos_de_infracao_table`;--> statement-breakpoint
DROP TABLE `autos_de_infracao_table`;--> statement-breakpoint
ALTER TABLE `__new_autos_de_infracao_table` RENAME TO `autos_de_infracao_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;