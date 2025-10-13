export interface InfractionMock {
  id: string;
  title: string;
  date: string; // ISO string
  tags?: string[];
}

const infractions: InfractionMock[] = [
  {
    id: '1',
    title: 'Abate ilegal de Animais Silvestres',
    date: '2025-02-13T15:45:00',
    tags: ['Com presença'],
  },
  {
    id: '2',
    title: 'Desmatamento irregular',
    date: '2025-03-01T10:30:00',
    tags: ['Sem presença'],
  },
  {
    id: '3',
    title: 'Desmatamento irregular',
    date: '2025-03-01T10:30:00',
    tags: ['Sem presença'],
  },
  {
    id: '4',
    title: 'Desmatamento irregular',
    date: '2025-03-01T10:30:00',
    tags: ['Sem presença'],
  },
  {
    id: '5',
    title: 'Desmatamento irregular',
    date: '2025-03-01T10:30:00',
    tags: ['Sem presença'],
  },
  {
    id: '6',
    title: 'Poluição de curso d\'água',
    date: '2025-04-18T09:15:00',
    tags: ['Com presença', 'Curso d\'água'],
  },
];

export default infractions;
