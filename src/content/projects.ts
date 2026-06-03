export interface ProjectEntry {
  name: string
  eyebrow: string
  period?: string
  summary: string
  role: string
  outcome: string
  tech: string[]
  details: string[]
  color: 'cyan' | 'magenta' | 'yellow'
}

export const projects: ProjectEntry[] = [
  {
    name: 'Ascotts',
    eyebrow: 'Hotel booking platform',
    period: '2022 - 2024',
    summary: 'Ascotts was a hotel booking project for Capitaland, built in a multi-vendor microservice environment where many teams contributed across the platform.',
    role: 'I worked as a full-stack developer on the project, contributing across frontend and backend while collaborating inside a large multi-vendor delivery model. Over time, I also moved into a leadership position within the project.',
    outcome: 'The project gave me hands-on experience shipping inside a large enterprise booking platform, coordinating across many vendors, and growing from contributor to project leader in a microservice-based system.',
    tech: ['AEM', 'Adobe Experience Manager', 'Vue.js', 'Spring Boot', 'SQL Server', 'Microservices'],
    details: [
      'Built and maintained features for a hotel booking platform under the Capitaland group.',
      'Worked in a microservice architecture with multiple vendors contributing to the same ecosystem.',
      'Contributed as a full-stack developer across Vue.js frontend and Spring Boot backend services.',
      'Worked with Adobe AEM as part of the platform stack alongside SQL Server.',
      'Progressed into a leadership role within the project while coordinating delivery across a more complex team structure.',
    ],
    color: 'cyan',
  },
  {
    name: 'Gorilla',
    eyebrow: 'Travel booking platform',
    period: '2024 - 2025',
    summary: 'Gorilla is a Hanatour System Japan project focused on hotel booking, train ticket purchases, and travel place tickets in Japan.',
    role: 'I contributed to the project as a developer working mainly on the backend side with Spring Boot and servlet-based frontend rendering similar to Thymeleaf-style delivery.',
    outcome: 'My work helped improve the speed and quality of search-related experiences, especially around API performance and discovery flows for travel products.',
    tech: ['Spring Boot', 'Servlet', 'Server-rendered UI', 'ElasticSearch', 'Travel Booking'],
    details: [
      'Worked on a Hanatour System Japan platform that supports hotel booking, train ticket purchases, and tickets for travel places in Japan.',
      'The project stack was centered around Spring Boot with servlet-based frontend rendering instead of a separate SPA frontend.',
      'Contributed to backend and feature work around booking and search flows.',
      'Enhanced search API performance and used ElasticSearch to improve the search feature.',
    ],
    color: 'yellow',
  },
  {
    name: 'Hanamade',
    eyebrow: 'Tour creation platform',
    period: '2024 - Present',
    summary: 'Hanamade is a new platform built at Hanatour System Japan for European travel agencies to create, customize, and sell tours operated by Hanatour in Japan.',
    role: 'I worked as a full-stack developer on the project and was the person who created the frontend source code from the beginning. I contributed across Vue.js frontend, Spring Boot backend, Python tooling, and also participated in database design for the system.',
    outcome: 'The project gave agencies a flexible platform to build tours around customer needs, while giving the engineering team a solid foundation for more advanced tour customization workflows.',
    tech: ['Vue.js', 'Spring Boot', 'MySQL', 'Python', 'Ant Design'],
    details: [
      'Built a new project from scratch for Hanatour System Japan, a company that provides travel tours to Japan.',
      'Developed features that allow agencies in Europe to create tours and customize existing tours for different customer needs.',
      'Implemented complex tour customization flows such as changing itineraries inside a tour and replacing hotels day by day.',
      'Created the frontend codebase from the beginning using Vue.js while also contributing as a full-stack developer across backend services.',
      'Built a Python tool to read PDF responses and scan QR codes so fax or email replies could be matched back to the correct order and product, such as arranged tickets for amusement parks or other booked items.',
      'Participated in database design for the system alongside feature development.',
    ],
    color: 'cyan',
  },
]
