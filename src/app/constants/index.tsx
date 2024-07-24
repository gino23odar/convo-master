import exp from "constants";
import {twitter, insta} from "../assets";

export const socialMedia = [
    {
      id: "social-media-1",
      icon: insta,
      link: "https://www.instagram.com/randO",
    },
    {
      id: "social-media-2",
      icon: twitter,
      link: "https://www.twitter.com/randO",
    },
  ];

  export const helpTopic = [
    {question: 'What is Conversationalist?',answer: 'Conversationalist is an app to simplify interactions for the conversationaly challenged', topic: 'help'},
    {question: 'How does it work?', topic: 'help', answer: '1.Type out a question and answer in the form and store it under a specific topic to be accessed later. \n2. Click on the topic to view the question and answer for your next conversation. \n3. Get AI to give you appropriate responses to questions you may be asked.'},
    {question: 'Can I delete a question or topic?', topic: 'help', answer: 'Everyone makes mistakes, Conversationalist has planned to include a feature to delete individual questions and topics in the future.'},
  ]