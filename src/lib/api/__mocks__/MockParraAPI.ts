import ParraAPI, { BulkAnswerQuestionsBody } from '../ParraAPI';

export const noContentResponse = (): Response => ({
  headers: new Headers(),
  ok: true,
  redirected: false,
  status: 204,
  statusText: 'ok',
  type: 'basic',
  url: '',
  clone: function (): Response {
    throw new Error('Function not implemented.');
  },
  body: null,
  bodyUsed: false,
  arrayBuffer: function (): Promise<ArrayBuffer> {
    throw new Error('Function not implemented.');
  },
  blob: function (): Promise<Blob> {
    throw new Error('Function not implemented.');
  },
  formData: function (): Promise<FormData> {
    throw new Error('Function not implemented.');
  },
  json: function (): Promise<any> {
    return Promise.resolve({});
  },
  text: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
});

class MockParraAPI extends ParraAPI {
  bulkAnswerQuestions = async (body?: BulkAnswerQuestionsBody) => {
    return noContentResponse();
  };
}

export default MockParraAPI;
