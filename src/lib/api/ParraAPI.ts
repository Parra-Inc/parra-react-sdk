import { HTTPClient } from '../http/HTTPClient';

export interface AuthorizationCheckRequestBody {
  namespace: string;
  subject: string;
  scope: string;
  context?: Map<string, any>;
}

export interface AuthorizationCheck {
  allowed: boolean;
}

export interface CreateCheckoutSessionRequestBody {
  plan_id: string;
}

export interface CheckoutSession {
  url: string;
}

export interface BillingPortalSession {
  url: string;
}

export interface CreateCustomerRequestBody {
  name: string;
  tenant_id: string;
}

export interface Customer {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  tenant_id: string;
  stripe_customer_id: string;
}

export enum Currency {
  usd = 'usd',
}

export enum Interval {
  monthly = 'monthly',
  annual = 'annual',
}

export interface Price {
  currency: Currency;
  amount: number;
}

export interface UnitPrice {
  currency: Currency;
  amount: number;
  interval?: Interval | null;
}

export interface Plan {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tier: string | null;
  interval: string | null;
  price: UnitPrice | null;
  discounted_price?: Price | null;
  unit_price: UnitPrice | null;
  context?: string | null;
}

export enum SubscriptionStatus {
  incomplete = 'incomplete',
  incompleteExpired = 'incomplete_expired',
  trialing = 'trialing',
  active = 'active',
  pastDue = 'past_due',
  canceled = 'canceled',
  unpaid = 'unpaid',
}

export interface SubscriptionItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  plan_id: string;
  quantity: number;
}

export interface Subscription {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  customer_id: string;
  status: SubscriptionStatus | null;
  cancel_at?: string | null;
  cancel_at_period_end?: boolean | null;
  canceled_at?: string | null;
  current_period_start?: string | null;
  current_period_end?: string | null;
  start_date?: string | null;
  ended_at?: string | null;
  trial_start?: string | null;
  trial_end?: string | null;
  items: Array<SubscriptionItem> | null;
}

export interface TenantPlansResponse {
  plans?: Array<Plan> | null;
  subscriptions?: Array<Subscription> | null;
}

export interface StripeEvent {}

export interface CreateAudienceRequestBody {
  tenant_id: string;
  name: string;
}

export interface Audience {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name: string;
}

export interface CreateSubscriberRequestBody {
  email: string;
}

export interface Entitlement {}

export type Entitlements = Array<Entitlement>;

export type UpdateEntitlementsRequestBody = Array<Entitlement>;

export interface CreateTenantRequestBody {
  name: string;
  is_test: boolean;
}

export interface TenantUser {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  is_test: boolean;
  entitlements?: Array<Entitlement> | null;
  scopes: Array<string>;
}

export interface Tenant {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  is_test: boolean;
  entitlements?: Array<Entitlement> | null;
}

export type TenantListResponse = Array<Tenant>;

export interface TenantCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Tenant>;
}

export interface TenantMetrics {
  team_member_count: number;
}

export interface CreateApiKeyRequestBody {
  name: string;
  description?: string | null;
}

export interface ApiKey {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  tenant_id: string;
}

export interface ApiKeyWithSecretResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  tenant_id: string;
  secret: string;
}

export interface ApiKeyCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<ApiKey>;
}

export interface TenantInvitationRequestBody {
  name: string;
  email: string;
}

export interface TenantInvitation {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  member_id?: string | null;
  name: string;
  email: string;
  code: string;
  expires_at?: string;
  accepted_at?: string | null;
}

export type TenantInvitationListResponse = Array<TenantInvitation>;

export interface TeamMember {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  user_id?: string | null;
  name: string;
  email: string;
  avatar_url?: string;
}

export type TeamMemberListResponse = Array<TeamMember>;

export interface AnswerData {}

export interface FeedbackMetrics {
  questions_created_this_month: number;
}

export interface Answer {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  question_id: string;
  user_id: string;
  tenant_id: string;
  data: AnswerData;
}

export interface AnswerQuestionBody {
  data: AnswerData;
}

export interface BulkAnswerQuestionBody {
  question_id: string;
  data: AnswerData;
}

export type BulkAnswerQuestionsBody = Array<BulkAnswerQuestionBody>;

export type CardItemData = Question;

export enum CardItemType {
  question = 'question',
}

export interface CardItem {
  type: CardItemType | null;
  version: string | null;
  data: CardItemData | null;
}

export interface CardsResponse {
  items: Array<CardItem> | null;
}

export enum QuestionType {
  choice = 'choice',
  rating = 'rating',
}

export enum QuestionKind {
  radio = 'radio',
  checkbox = 'checkbox',
  star = 'star',
}

export interface MutableChoiceQuestionOption {
  title: string | null;
  value: string | null;
  is_other?: boolean | null;
}

export interface ChoiceQuestionOption {
  title: string | null;
  value: string | null;
  is_other?: boolean | null;
  id: string | null;
}

export interface ChoiceQuestionBody {
  options: Array<ChoiceQuestionOption> | null;
}

export interface MutableChoiceQuestionBody {
  options: Array<MutableChoiceQuestionOption> | null;
}

export type MutableQuestionData = MutableChoiceQuestionBody;

export type QuestionData = ChoiceQuestionBody;

export interface UpdateQuestionRequestBody {
  title: string;
  subtitle?: string | null;
  data: MutableQuestionData | null;
  active?: boolean;
  expires_at?: string | null;
  answer_quota?: number | null;
}

export interface CreateQuestionRequestBody {
  title: string;
  subtitle?: string | null;
  data: MutableQuestionData | null;
  active?: boolean;
  expires_at?: string | null;
  answer_quota?: number | null;
  type: QuestionType | null;
  kind: QuestionKind | null;
}

export enum QuestionStatus {
  open = 'open',
  closed = 'closed',
}

export interface Question {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  status: QuestionStatus | null;
  tenant_id: string;
  title: string;
  subtitle?: string | null;
  type: QuestionType | null;
  kind: QuestionKind | null;
  data: QuestionData | null;
  active?: boolean;
  answer_quota?: number | null;
  answer_count?: number;
  expires_at?: string | null;
  closed_at?: string | null;
  answer?: Answer | null;
  metrics?: QuestionMetrics | null;
}

export interface QuestionCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Question>;
}

export interface QuestionMetrics {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  question_id: string;
  answer_count: number;
  type: QuestionType | null;
  data: QuestionMetricsData | null;
}

export type QuestionMetricsData = ChoiceQuestionMetricsBody;

export interface ChoiceQuestionMetricsBody {
  options: Array<ChoiceQuestionMetricsOption> | null;
}

export interface ChoiceQuestionMetricsOption {
  title: string | null;
  value: string | null;
  is_other?: boolean | null;
  id: string | null;
  answer_count: number;
}

export interface NotificationRecipient {
  user_id?: string | null;
}

export interface CreateNotificationRequestBody {
  type?: string;
  title: string;
  subtitle?: string | null;
  body?: string | null;
  image_url?: string | null;
  data?: Map<string, any> | null;
  action?: Map<string, any> | null;
  deduplication_id?: string | null;
  group_id?: string | null;
  visible?: boolean;
  silent?: boolean;
  content_available?: boolean;
  expires_at?: string | null;
  recipients: Array<NotificationRecipient> | null;
}

export interface NotificationResponse {
  type?: string;
  title: string;
  subtitle?: string | null;
  body?: string | null;
  image_url?: string | null;
  data?: Map<string, any> | null;
  action?: Map<string, any> | null;
  deduplication_id?: string | null;
  group_id?: string | null;
  visible?: boolean;
  silent?: boolean;
  content_available?: boolean;
  expires_at?: string | null;
  user_id?: string | null;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  viewed_at?: string | null;
  version?: string;
}

export interface NotificationCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<NotificationResponse>;
}

export interface ReadNotificationsRequestBody {
  notification_ids: Array<string>;
}

export interface CreatePushTokenRequestBody {
  user_id?: string;
  apns_token: string;
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
  avatar_url?: string | null;
  locale?: string | null;
  type: string;
}

export interface CreateIdentityRequestBody {
  provider: string;
  provider_user_id: string;
}

export interface IdentityResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  provider: string;
  provider_user_id: string;
  user_id: string;
}

export interface CreateUserRequestBody {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  email_verified?: boolean;
  avatar_url?: string | null;
  locale?: string | null;
  type: string;
  identities?: Array<CreateIdentityRequestBody> | null;
}

export interface UpdateUserRequestBody {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<UserResponse>;
}

export interface CheckAuthorizationRequestBody {
  scope: string;
}

export interface AuthToken {
  access_token: string;
}

export interface CheckAuthorization {
  allowed: boolean;
}

export interface UserInfoResponse {
  user?: UserResponse | null;
}

class ParraAPI {
  constructor(private http: HTTPClient, private options: { baseUrl: string }) {}

  createCustomer = (body?: CreateCustomerRequestBody): Promise<Customer> => {
    return this.http.execute(`${this.options.baseUrl}/v1/customers`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  updateEntitlementsForCustomerById = (
    customer_id: string
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/customers/${customer_id}/entitlements`,
      {
        method: 'post',
      }
    );
  };

  createBillingPortalSession = (
    tenant_id: string
  ): Promise<BillingPortalSession> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/billing-portal/sessions`,
      {
        method: 'post',
      }
    );
  };

  createCheckoutSession = (
    body?: CreateCheckoutSessionRequestBody
  ): Promise<CheckoutSession> => {
    return this.http.execute(`${this.options.baseUrl}/v1/checkout/sessions`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  getPlansForTenantById = (tenant_id: string): Promise<TenantPlansResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/plans`,
      {
        method: 'post',
      }
    );
  };

  createAudience = (body?: CreateAudienceRequestBody): Promise<Audience> => {
    return this.http.execute(`${this.options.baseUrl}/v1/email/audiences`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  createSubscriberForAudienceById = (
    audience_id: string,
    body?: CreateSubscriberRequestBody
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/email/audiences/${audience_id}/subscribers`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
      }
    );
  };

  getTenantById = (tenant_id: string): Promise<Tenant> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}`,
      {
        method: 'get',
      }
    );
  };

  createTenantForUserById = (
    user_id: string,
    body?: CreateTenantRequestBody
  ): Promise<Tenant> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/users/${user_id}/tenants`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  getTenantsForUserById = (user_id: string): Promise<TenantListResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/users/${user_id}/tenants`,
      {
        method: 'get',
      }
    );
  };

  createApiKeyForTenantById = (
    tenant_id: string,
    body?: CreateApiKeyRequestBody
  ): Promise<ApiKeyWithSecretResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/api-keys`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  getApiKeysForTenantById = (
    tenant_id: string
  ): Promise<ApiKeyCollectionResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/api-keys`,
      {
        method: 'get',
      }
    );
  };

  deleteApiKeyForTenantById = (
    tenant_id: string,
    api_key_id: string
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/api-keys/${api_key_id}`,
      {
        method: 'delete',
      }
    );
  };

  getTenantForApiKeyById = (api_key_id: string): Promise<Tenant> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/api-keys/${api_key_id}/tenant`,
      {
        method: 'get',
      }
    );
  };

  getInvitationsForTenantById = (
    tenant_id: string
  ): Promise<TenantInvitationListResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/invitations`,
      {
        method: 'get',
      }
    );
  };

  createInvitationForTenantById = (
    tenant_id: string,
    body?: TenantInvitationRequestBody
  ): Promise<TenantInvitation> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/invitations`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  acceptInvitationByCode = (
    invitation_code: string
  ): Promise<TenantInvitation> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/invitations/${invitation_code}/accept`,
      {
        method: 'post',
      }
    );
  };

  getTeamMembersForTenantById = (
    tenant_id: string
  ): Promise<TeamMemberListResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/team-members`,
      {
        method: 'get',
      }
    );
  };

  deleteTeamMemberForTenantById = (
    tenant_id: string,
    team_member_id: string
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/team-members/${team_member_id}`,
      {
        method: 'delete',
      }
    );
  };

  updateTeamMemberUserForTenantById = (
    tenant_id: string,
    team_member_id: string
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/${tenant_id}/team-members/${team_member_id}/user`,
      {
        method: 'post',
      }
    );
  };

  getCards = (): Promise<CardsResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/cards`, {
      method: 'get',
    });
  };

  createQuestion = (body?: CreateQuestionRequestBody): Promise<Question> => {
    return this.http.execute(`${this.options.baseUrl}/v1/questions`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  paginateQuestions = (query?: {
    $select?: string;
    $top?: number;
    $skip?: number;
    $orderby?: string;
    $filter?: string;
    $expand?: string;
    $search?: string;
  }): Promise<QuestionCollectionResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/questions`, {
      method: 'get',
      query,
    });
  };

  getQuestionById = (question_id: string): Promise<Question> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}`,
      {
        method: 'get',
      }
    );
  };

  updateQuestionById = (
    question_id: string,
    body?: UpdateQuestionRequestBody
  ): Promise<Question> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}`,
      {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  deleteQuestionById = (question_id: string): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}`,
      {
        method: 'delete',
      }
    );
  };

  closeQuestionById = (question_id: string): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}/close`,
      {
        method: 'post',
      }
    );
  };

  createMetricsForQuestionById = (
    question_id: string
  ): Promise<QuestionMetrics> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}/metrics`,
      {
        method: 'post',
      }
    );
  };

  answerQuestionById = (
    question_id: string,
    body?: AnswerQuestionBody
  ): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}/answer`,
      {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
      }
    );
  };

  bulkAnswerQuestions = (body?: BulkAnswerQuestionsBody): Promise<Response> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/bulk/questions/answer`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
        raw: true,
      }
    );
  };

  createUser = (body: CreateUserRequestBody): Promise<UserResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  listUsers = (query?: {
    $select?: string;
    $top?: number;
    $skip?: number;
    $orderby?: string;
    $filter?: string;
    $expand?: string;
    $search?: string;
  }): Promise<UserCollectionResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users`, {
      method: 'get',
      query,
    });
  };

  getUserById = (user_id: string): Promise<UserResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users/${user_id}`, {
      method: 'get',
    });
  };

  updateUserById = (
    user_id: string,
    body: UpdateUserRequestBody
  ): Promise<UserResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users/${user_id}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  deleteUserById = (user_id: string): Promise<Response> => {
    return this.http.execute(`${this.options.baseUrl}/v1/users/${user_id}`, {
      method: 'delete',
    });
  };

  createIdentityForUserById = (
    user_id: string,
    body: CreateIdentityRequestBody
  ): Promise<IdentityResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/users/${user_id}/identities`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  listIdentitiesForUserById = (
    user_id: string
  ): Promise<Array<IdentityResponse>> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/users/${user_id}/identities`,
      {
        method: 'get',
      }
    );
  };

  getUserByProviderAndProviderUserId = (
    provider: string,
    provider_user_id: string
  ): Promise<UserResponse> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/providers/${provider}/identities/${provider_user_id}/user`,
      {
        method: 'get',
      }
    );
  };

  checkAuthorization = (
    body?: CheckAuthorizationRequestBody
  ): Promise<CheckAuthorization> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/tenants/authorization/check`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  getUserInfo = (): Promise<UserInfoResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/user-info`, {
      method: 'get',
    });
  };

  getParraAuthToken = (): Promise<AuthToken> => {
    return this.http.execute(`${this.options.baseUrl}/v1/parra/auth/token`, {
      method: 'post',
    });
  };
}

export default ParraAPI;
