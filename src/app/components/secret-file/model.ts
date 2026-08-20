export interface Skill {
  cat: string;
  list: string;
}

export const SKILLS_DATA: Skill[] = [
  { cat: 'Frontend', list: 'Angular, TypeScript, JavaScript, HTML5, CSS3, SCSS' },
  { cat: 'Backend',  list: 'Node.js, Express.js, REST APIs' },
  { cat: 'Tools',    list: 'Git/GitHub, VS Code, npm, Webpack' },
  { cat: 'Other',    list: 'Responsive Design, Agile/Scrum, Unit Testing' }
];
