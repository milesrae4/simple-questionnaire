import {
  addRoutesToRouter,
  bodyparser,
  HttpMethod,
  Router,
  route,
  err,
  SchemaBuilder,
} from '@lcdev/router';
import QuizService, { QuizServiceError } from './service';

export default (questionService: QuizService) => {
  const router = new Router();

  router.use(bodyparser());

  return addRoutesToRouter(router, [
    route({
      path: '/',
      method: HttpMethod.GET,
      async action() {
        try {
          const questions = await questionService.getQuestions();

          return questions;
        } catch (e: any) {
          switch (e.type) {
            case QuizServiceError.FileReadError:
              throw err(500, e.message);
            default:
              throw e;
          }
        }
      },
    }),
    route({
      path: '/',
      method: HttpMethod.POST,
      schema: SchemaBuilder.emptySchema().addArray(
        'answers',
        SchemaBuilder.emptySchema()
          .addInteger('questionId')
          .addString('answer'),
      ),
      async action(ctx, { answers }) {
        try {
          const quizResults = await questionService.determineQuizResults(
            answers,
          );

          return quizResults;
        } catch (e: any) {
          switch (e.type) {
            case QuizServiceError.MissingQuestionAnswer:
              throw err(400, e.message).withData(e.data);
            case QuizServiceError.AnswerNotFound:
              throw err(404, e.message).withData(e.data);
            default:
              throw e;
          }
        }
      },
    }),
  ]);
};
