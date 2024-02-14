import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  const questions: {
    id: number;
    question: string;
    options: string[];
  }[] = [
    {
      id: 1,
      question: "How many states are in the USA?",
      options: ["52", "40", "50", "51"]
    },
    {
      id: 2,
      question: "What is the capital of Florida?",
      options: ["Tampa Bay", "Tallahassee", "Orlando", "Miami"]
    },
    {
      id: 3,
      question: "What year was the Declaration of Independence signed?",
      options: ["1776", "1772", "1792", "1881"]
    },
    {
      id: 4,
      question: "How many states were originally part of the US?",
      options: ["9", "13", "11", "50"]
    },
    {
      id: 5,
      question: "Which US state has the largest land mass?",
      options: ["Montana", "Texas", "California", "Alaska"]
    },
    {
      id: 6,
      question: "Which of these are one of two national animals of the United States?",
      options: ["Elk", "American Bison", "Grizzly Bear", "Californian Condor"]
    },
    {
      id: 7,
      question: "Which city has the highest population in the United States?",
      options: ["Chicago", "Houston", "New York", "Los Angeles"]
    },
    {
      id: 8,
      question: "Who is on the American $10 bill?",
      options: [
        "Alexander Hamilton",
        "Benjamin Franklin",
        "George Washington",
        "Abraham Lincoln"
      ]
    },
    {
      id: 9,
      question: "Which US state does not border with Canada?",
      options: ["Washington", "Montana", "Ohio", "Massachusetts"]
    },
    {
      id: 10,
      question: "What state is the Statue of Liberty in?",
      options: ["New Jersey", "New York", "Maryland", "Virginia"]
    }
  ];

  const answers: {
    id: number;
    questionId: number;
    answer: string;
  }[] = [
    {
      id: 1,
      questionId: 1,
      answer: "50"
    },
    {
      id: 2,
      questionId: 2,
      answer: "Tallahassee"
    },
    {
      id: 3,
      questionId: 3,
      answer: "1776"
    },
    {
      id: 4,
      questionId: 4,
      answer: "13"
    },
    {
      id: 5,
      questionId: 5,
      answer: "Alaska"
    },
    {
      id: 6,
      questionId: 6,
      answer: "American Bison"
    },
    {
      id: 7,
      questionId: 7,
      answer: "New York"
    },
    {
      id: 8,
      questionId: 8,
      answer: "Alexander Hamilton"
    },
    {
      id: 9,
      questionId: 9,
      answer: "Massachusetts"
    },
    {
      id: 10,
      questionId: 10,
      answer: "New Jersey"
    }
  ];

  for (let question of questions) {
    const [questionFound] = await knex("questions")
      .select(["id"])
      .where("id", "=", question.id);

    if (!questionFound) {
      await knex("questions").insert([{ question: question.question, options: JSON.stringify(question.options) }]);
    }
  }

  for (let answer of answers) {
    const [answerFound] = await knex("answers")
      .select(["question_id"])
      .where("question_id", "=", answer.questionId);

    if (!answerFound) {
      await knex("answers").insert([
        { question_id: answer.questionId, answer: answer.answer }
      ]);
    }
  }
}
