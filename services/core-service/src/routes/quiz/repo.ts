import { Answer } from '../../data-types/answer.type';
import { Question } from '../../data-types/question.type';
import { getKnex } from '../../lib/database';

export default class QuizRepo {
  async getQuestions() {
    // imagine this is coming from an ORM that has proper typing
    const db = getKnex();

    const questions: Question[] = await db('questions').select(['id', 'question', 'options'])

    return questions;
  }

  async getQuestionAnswers() {
    // imagine this is coming from an ORM that has proper typing
    const db = getKnex();

    const answers: Answer[] = await db('answers').select(['id', 'answer', 'question_id'])

    return answers;
  }
}
