import { AxiosResponse } from 'axios';
import { ApiData } from 'questionnaire-shared';
import { createBaseApi } from './base-api';

interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const createApi = (baseUrl: string) => {
  const coreServiceApi = createBaseApi(baseUrl);

  return {
    questions: {
      async getQuestionsList() {
        type Response = AxiosResponse<ApiResponse<ApiData.QuestionsList>>;

        const response = await coreServiceApi.get<Response>('/quiz');

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response.data;

        return data;
      },
      async postQuizAnswers(quizAnswers: ApiData.Answer[]) {
        type Response = AxiosResponse<ApiResponse<ApiData.QuizResults>>;

        const response = await coreServiceApi.post<Response>('/quiz', {
          answers: quizAnswers,
        });

        if (response.status !== 200) throw new Error(response.statusText);

        const { data } = response.data;

        return data;
      },
    },
  };
};

export const coreServiceApi = createApi('http://localhost:9002');
