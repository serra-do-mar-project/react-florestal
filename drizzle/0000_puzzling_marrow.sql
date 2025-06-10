CREATE TABLE `infracoes_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome_resumo` text NOT NULL,
	`nome_compelto` text NOT NULL,
	`palavra_chave` text NOT NULL,
	`categoria` text NOT NULL,
	`tags` text,
	`proc_OP` text NOT NULL,
	`proc_ADM` text NOT NULL,
	`enquad_PEN` text NOT NULL,
	`enquad_ADM` text NOT NULL,
	`formulario` text NOT NULL,
	`tipo_ocorrencia` text NOT NULL,
	`campos` text NOT NULL
);
