CREATE TABLE `autos_de_infracao_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome_resumo` text NOT NULL,
	`tags` text NOT NULL,
	`modelo` text NOT NULL,
	`data` text NOT NULL,
	`categoria` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `exemplo_de_caso_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome_resumo` text NOT NULL,
	`nome_completo` text NOT NULL,
	`palavra_chave` text NOT NULL,
	`categoria` text NOT NULL,
	`tipo_ocorrencia` text NOT NULL,
	`tags` text,
	`proc_op` text NOT NULL,
	`proc_adm` text NOT NULL,
	`enq_pen` text NOT NULL,
	`enq_adm` text NOT NULL,
	`modelo` text NOT NULL,
	`campos` text NOT NULL
);
