import { HTTPClient } from '../http/HTTPClient';

export interface Size {
  width: number;
  height: number;
}

export interface EntityIdStub {
  id: string;
}

export interface ImageAssetStub {
  id: string;
  size: Size;
  url: string;
}

export interface Entity {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface UserResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  email_verified?: boolean;
  locale?: string | null;
  type: string;
  role?: string | null;
  role_other_description?: string | null;
  avatar?: ImageAssetStub;
}

export enum IdentityType {
  anonymous = 'anonymous',
  username = 'username',
  email = 'email',
  phoneNumber = 'phone_number',
  externalId = 'external_id',
}

export interface Identity {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  type: IdentityType;
  provider?: string | null;
  provider_user_id?: string | null;
  email?: string | null;
  email_verified?: boolean | null;
  phone_number?: string | null;
  phone_number_verified?: boolean | null;
  username?: string | null;
  external_id?: string | null;
  has_password?: boolean | null;
}

export interface TenantUserStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name?: string | null;
  avatar?: ImageAssetStub | null;
}

export interface TenantUserCollectionStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name?: string | null;
  avatar?: ImageAssetStub | null;
  identity?: string | null;
  username?: string | null;
  email?: string | null;
  email_verified?: boolean | null;
  phone_number?: string | null;
  phone_number_verified?: boolean | null;
  first_name?: string | null;
  last_name?: string | null;
  is_anonymous: boolean;
  is_internal: boolean;
  is_test: boolean;
  is_blocked?: boolean;
  blocked_at?: string | null;
  blocked_reason?: string | null;
  locale?: string | null;
  signed_up_at?: string | null;
  last_updated_at?: string | null;
  last_seen_at?: string | null;
  last_login_at?: string | null;
  has_password: boolean;
}

export interface TenantUserDataStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name?: string | null;
  avatar?: ImageAssetStub | null;
  identity?: string | null;
  username?: string | null;
  email?: string | null;
  email_verified?: boolean | null;
  phone_number?: string | null;
  phone_number_verified?: boolean | null;
  first_name?: string | null;
  last_name?: string | null;
  is_anonymous: boolean;
  is_internal: boolean;
  is_test: boolean;
  is_blocked?: boolean;
  blocked_at?: string | null;
  blocked_reason?: string | null;
  locale?: string | null;
  signed_up_at?: string | null;
  last_updated_at?: string | null;
  last_seen_at?: string | null;
  last_login_at?: string | null;
  has_password: boolean;
}

export interface TenantUser {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name?: string | null;
  avatar?: ImageAssetStub | null;
  identity?: string | null;
  username?: string | null;
  email?: string | null;
  email_verified?: boolean | null;
  phone_number?: string | null;
  phone_number_verified?: boolean | null;
  first_name?: string | null;
  last_name?: string | null;
  is_anonymous: boolean;
  is_internal: boolean;
  is_test: boolean;
  is_blocked?: boolean;
  blocked_at?: string | null;
  blocked_reason?: string | null;
  locale?: string | null;
  signed_up_at?: string | null;
  last_updated_at?: string | null;
  last_seen_at?: string | null;
  last_login_at?: string | null;
  has_password: boolean;
  properties: object;
  metadata: object;
  identities?: Array<Identity> | null;
}

export interface UserInfoResponse {
  roles?: Array<string>;
  user?: UserResponse | null;
  tenant_user?: TenantUser | null;
}

export interface CreateEmailSubscriberRequestBody {
  email: string;
}

export enum FeedbackFormFieldType {
  text = 'text',
  input = 'input',
  select = 'select',
}

export interface FeedbackFormTextFieldData {
  placeholder?: string | null;
  lines?: number | null;
  max_lines?: number | null;
  min_characters?: number | null;
  max_characters?: number | null;
  max_height?: number | null;
}

export interface FeedbackFormSelectFieldOption {
  title: string;
  value: string;
  is_other?: boolean;
}

export interface FeedbackFormSelectFieldData {
  placeholder?: string | null;
  options: Array<FeedbackFormSelectFieldOption>;
}

export interface FeedbackFormInputFieldData {
  placeholder?: string | null;
}

export type FeedbackFormFieldData =
  | FeedbackFormTextFieldData
  | FeedbackFormSelectFieldData
  | FeedbackFormInputFieldData;

export interface FeedbackFormField {
  name: string;
  title?: string;
  helper_text?: string | null;
  type: FeedbackFormFieldType;
  required: boolean;
  hidden?: boolean;
  data: FeedbackFormFieldData;
}

export interface FeedbackFormData {
  title: string;
  description?: string | null;
  fields: Array<FeedbackFormField>;
}

export interface FeedbackFormDataStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  data: FeedbackFormData;
}

export interface SubmitFeedbackFormResponseBody {}

export interface AnswerData {}

export interface BulkAnswerQuestionBody {
  question_id: string;
  bucket_item_id?: string | null;
  data: AnswerData;
}

export type BulkAnswersQuestionBody = Array<BulkAnswerQuestionBody>;

export enum CardItemType {
  question = 'question',
}

export enum CardItemDisplayType {
  inline = 'inline',
  popup = 'popup',
}

export enum QuestionType {
  choice = 'choice',
  checkbox = 'checkbox',
  rating = 'rating',
  text = 'text',
  rankedChoice = 'ranked-choice',
}

export enum QuestionKind {
  radio = 'radio',
  checkbox = 'checkbox',
  star = 'star',
  image = 'image',
  rating = 'rating',
  shortText = 'short-text',
  longText = 'long-text',
  emoji = 'emoji',
  boolean = 'boolean',
  slider = 'slider',
  rankedChoice = 'ranked-choice',
  tag = 'tag',
}

export interface MutableChoiceQuestionOption {
  title: string;
  value: string;
  is_other?: boolean | null;
}

export interface ChoiceQuestionOption {
  title: string;
  value: string;
  is_other?: boolean | null;
  id: string;
}

export interface ChoiceQuestionBody {
  options: Array<ChoiceQuestionOption>;
}

export interface MutableCheckboxQuestionOption {
  title: string;
  value: string;
  is_other?: boolean | null;
}

export interface CheckboxQuestionOption {
  title: string;
  value: string;
  is_other?: boolean | null;
  id: string;
}

export interface CheckboxQuestionBody {
  options: Array<CheckboxQuestionOption>;
}

export interface MutableImageQuestionOption {
  image_asset_id: string;
  title?: string | null;
  value: string;
}

export interface ImageQuestionOption {
  image_asset_id: string;
  title?: string | null;
  value: string;
  id: string;
  image_asset_url: string;
}

export interface ImageQuestionBody {
  options: Array<ImageQuestionOption>;
}

export interface MutableRatingQuestionOption {
  title: string;
  value: number;
}

export interface RatingQuestionOption {
  title: string;
  value: number;
  id: string;
}

export interface RatingQuestionBody {
  options: Array<RatingQuestionOption>;
  leading_label?: string;
  center_label?: string;
  trailing_label?: string;
}

export interface StarQuestionBody {
  star_count: number;
  leading_label?: string;
  center_label?: string;
  trailing_label?: string;
}

export interface ShortTextQuestionBody {
  placeholder?: string | null;
  min_length?: number | null;
  max_length?: number | null;
}

export interface LongTextQuestionBody {
  placeholder?: string | null;
  min_length?: number | null;
  max_length?: number | null;
}

export interface MutableBooleanQuestionOption {
  title: string;
  value: string;
}

export interface BooleanQuestionOption {
  title: string;
  value: string;
  id: string;
}

export interface BooleanQuestionBody {
  options: Array<BooleanQuestionOption>;
}

export type QuestionData =
  | ChoiceQuestionBody
  | CheckboxQuestionBody
  | ImageQuestionBody
  | RatingQuestionBody
  | StarQuestionBody
  | ShortTextQuestionBody
  | LongTextQuestionBody
  | BooleanQuestionBody;

export interface Answer {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  question_id: string;
  user_id: string;
  tenant_id: string;
  campaign_id?: string | null;
  bucket_item_id?: string | null;
  data: AnswerData;
}

export interface ChoiceQuestionMetricsOption {
  title: string;
  value: string;
  is_other?: boolean | null;
  id: string;
  answer_count: number;
}

export interface ChoiceQuestionMetricsBody {
  options: Array<ChoiceQuestionMetricsOption>;
}

export interface CheckboxQuestionMetricsOption {
  title: string;
  value: string;
  is_other?: boolean | null;
  id: string;
  answer_count: number;
}

export interface CheckboxQuestionMetricsBody {
  options: Array<CheckboxQuestionMetricsOption>;
}

export interface ImageQuestionMetricsOption {
  image_asset_id: string;
  title?: string | null;
  value: string;
  id: string;
  image_asset_url: string;
  answer_count: number;
}

export interface InageQuestionMetricsBody {
  options: Array<ImageQuestionMetricsOption>;
}

export interface RatingQuestionMetricsOption {
  title: string;
  value: number;
  id: string;
  answer_count: number;
}

export interface RatingQuestionMetricsBody {
  average_rating: number;
  options: Array<RatingQuestionMetricsOption>;
}

export interface MutableStarQuestionOption {
  title: string;
  value: number;
}

export interface StarQuestionOption {
  title: string;
  value: number;
  id: string;
}

export interface StarQuestionMetricsOption {
  title: string;
  value: number;
  id: string;
  answer_count: number;
}

export interface StarQuestionMetricsBody {
  average_rating: number;
  options: Array<StarQuestionMetricsOption>;
}

export interface LongTextQuestionMetricsBody {}

export interface ShortTextQuestionMetricsBody {}

export interface BooleanQuestionMetricsOption {
  title: string;
  value: string;
  id: string;
  answer_count: number;
}

export interface BooleanQuestionMetricsBody {
  average_rating: number;
  options: Array<BooleanQuestionMetricsOption>;
}

export type QuestionMetricsData =
  | ChoiceQuestionMetricsBody
  | CheckboxQuestionMetricsBody
  | InageQuestionMetricsBody
  | RatingQuestionMetricsBody
  | StarQuestionMetricsBody
  | LongTextQuestionMetricsBody
  | ShortTextQuestionMetricsBody
  | BooleanQuestionMetricsBody;

export interface QuestionMetrics {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  question_id: string;
  campaign_id?: string | null;
  answer_count: number;
  type: QuestionType;
  kind: QuestionKind;
  data: QuestionMetricsData;
}

export interface Question {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  title: string;
  subtitle?: string | null;
  type: QuestionType;
  kind: QuestionKind;
  data: QuestionData;
  answer_count?: number | null;
  answer?: Answer;
  metrics?: QuestionMetrics;
}

export type CardItemData = Question;

export interface CardItem {
  id: string;
  campaign_id: string;
  campaign_action_id: string;
  question_id?: string | null;
  type: CardItemType;
  display_type?: CardItemDisplayType;
  version: string;
  data: CardItemData;
}

export interface CardsResponse {
  items: Array<CardItem>;
}

export interface LoginTenantUserRequestBody {
  anonymous_token?: string | null;
}

export interface TenantUserInfo {
  roles: Array<string>;
  scopes: Array<string>;
  user: TenantUser;
}

export interface AuthToken {
  token_type: string;
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}

export interface AuthLogoutResponseBody {
  anonymous_token?: AuthToken;
  guest_token?: AuthToken;
}

export interface UpdateUserRequestBody {
  first_name: string;
  last_name: string;
  name: string;
  role?: string | null;
  role_other_description?: string | null;
}

export interface CreateIdentityRequestBody {
  provider: string;
  provider_user_id: string;
}

export interface CreateUserRequestBody {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  email_verified?: boolean;
  locale?: string | null;
  type: string;
  identities?: Array<CreateIdentityRequestBody>;
  metadata?: object | null;
}

export interface CollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
}

export interface UserCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<UserResponse>;
}

type Options = {
  signal?: AbortSignal | null;
};

class ParraAPI {
  constructor(private http: HTTPClient, private options: { baseUrl: string }) {}

  getUserInfo = (options: Options = {}): Promise<UserInfoResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/user-info`, {
      method: 'get',
      ...options,
    });
  };

  createSubscriberForEmailAudienceById = (
    email_audience_id: string,
    body: CreateEmailSubscriberRequestBody,
    options: Options = {}
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/email/audiences/${email_audience_id}/subscribers`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
        ...options,
      }
    );
  };

  getFormById = (
    feedback_form_id: string,
    options: Options = {}
  ): Promise<FeedbackFormDataStub> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/feedback/forms/${feedback_form_id}`,
      {
        method: 'get',
        ...options,
      }
    );
  };

  submitFormById = (
    feedback_form_id: string,
    body?: SubmitFeedbackFormResponseBody,
    options: Options = {}
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/feedback/forms/${feedback_form_id}/submit`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
        ...options,
      }
    );
  };

  bulkAnswerQuestions = (
    body?: BulkAnswersQuestionBody,
    options: Options = {}
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/bulk/questions/answer`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
        ...options,
      }
    );
  };

  getCardsForTenantById = (
    tenant_id: string,
    query?: {
      app_area_id?: string;
    },
    options: Options = {}
  ): Promise<CardsResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/cards`,
      {
        method: 'get',
        query,
        ...options,
      }
    );
  };

  loginUserForTenant = (
    tenant_id: string,
    body?: LoginTenantUserRequestBody,
    options: Options = {}
  ): Promise<TenantUserInfo> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/auth/login`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        ...options,
      }
    );
  };

  getTenantUserInfo = (
    tenant_id: string,
    options: Options = {}
  ): Promise<TenantUserInfo> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/auth/user-info`,
      {
        method: 'get',
        ...options,
      }
    );
  };

  logoutUserForTenant = (
    tenant_id: string,
    options: Options = {}
  ): Promise<AuthLogoutResponseBody> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/auth/logout`,
      {
        method: 'post',
        ...options,
      }
    );
  };

  updateAvatarForTenantUserById = (
    tenant_id: string,
    user_id: string,
    body: ImageAssetStub,
    options: Options = {}
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/users/${user_id}/avatar`,
      {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
        ...options,
      }
    );
  };

  deleteAvatarForTenantUserById = (
    tenant_id: string,
    user_id: string,
    options: Options = {}
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/users/${user_id}/avatar`,
      {
        method: 'delete',
        ...options,
      }
    );
  };

  getUserById = (
    user_id: string,
    options: Options = {}
  ): Promise<UserResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users/${user_id}`, {
      method: 'get',
      ...options,
    });
  };

  updateUserById = (
    user_id: string,
    body: UpdateUserRequestBody,
    options: Options = {}
  ): Promise<UserResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users/${user_id}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
      ...options,
    });
  };

  deleteUserById = (
    user_id: string,
    options: Options = {}
  ): Promise<Response> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users/${user_id}`, {
      method: 'delete',
      ...options,
    });
  };

  createUser = (
    body: CreateUserRequestBody,
    options: Options = {}
  ): Promise<UserResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
      ...options,
    });
  };

  listUsers = (
    query?: {
      $select?: string;
      $top?: number;
      $skip?: number;
      $orderby?: string;
      $filter?: string;
      $expand?: string;
      $search?: string;
    },
    options: Options = {}
  ): Promise<UserCollectionResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users`, {
      method: 'get',
      query,
      ...options,
    });
  };
}

export default ParraAPI;
