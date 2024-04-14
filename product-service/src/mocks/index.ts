import { Product, Stock } from '../models';

export const products: Product[] = [
  {
    description:
      'Improving the Design of Existing Code ”shed light on the refactoring process, describing the principles and best practices for its implementation.',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    price: 24,
    title: 'Improving the Design of Existing Code',
  },
  {
    description:
      'Pragmatic programmer. The path from apprentice to master” will tell you everything a person needs to know, starting his way in the field of IT projects. Almost a cult book. You will learn how to deal with software shortcomings, how to create a dynamic, effective and adaptable program, how to form a successful team of programmers.',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
    price: 15,
    title: 'Pragmatic programmer',
  },
  {
    description:
      "Perfect code. Master-class - an updated edition of the time-tested bestseller. A book that makes you think and helps you create the perfect code. And it doesn't matter if you are a beginner or a pro, in this publication you will definitely find information for growth and work on your project.",
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
    price: 23,
    title: 'Perfect code',
  },
  {
    description:
      'The book At the peak. How to maintain maximum efficiency without burnout "is especially necessary for programmers who are accustomed to plunge headlong into work, not keeping track of time and waste of resources such as strength and health. ',
    id: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
    price: 15,
    title: 'At the peak',
  },
  {
    description:
      "This book is interesting to read for both a beginner and an experienced programmer. The authors clearly and humorously talk about the fact that programming is in many ways communication. Programming style, naming, commenting, working with someone else's code - often agreements develop exactly where there is strict regulation at the programming language level.",
    id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
    price: 23,
    title: 'Interactive Programming',
  },
  {
    description:
      "Updated anniversary edition of the legendary book 'Design Patterns'. Many programming problems tend to be repetitive and duplicative. Developers around the world are solving completely identical problems and finding similar solutions. If you don't want to reinvent the wheel, use the ready-made design patterns that this book is about to work with.",
    id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
    price: 15,
    title: 'Design Patterns',
  },
];

export const stocks: Stock[] = [
  {
    product_id: products[0].id,
    count: 3,
  },
  {
    product_id: products[1].id,
    count: 2,
  },
  {
    product_id: products[2].id,
    count: 0,
  },
  {
    product_id: products[3].id,
    count: 15,
  },
  {
    product_id: products[4].id,
    count: 1,
  },
  {
    product_id: products[5].id,
    count: 7,
  },
];
