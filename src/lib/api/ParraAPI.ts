import { HTTPClient } from '../http/HTTPClient';

export interface Size {
  width: number;
  height: number;
}

export interface UploadImageAssetRequestBody {
  group: string;
  image: File;
}

export interface ImageAsset {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  size: Size;
  url: string;
  bucket: string;
  key: string;
  group: string;
  file_type: string;
  mime_type: string;
}

export interface AuthorizationCheckRequestBody {
  namespace: string;
  subject: string;
  scope: string;
  context?: object;
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
  interval: Interval;
}

export interface Plan {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tier: string;
  interval: string;
  price: UnitPrice;
  discounted_price?: Price;
  unit_price: UnitPrice;
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
  status: SubscriptionStatus;
  cancel_at?: string | null;
  cancel_at_period_end?: boolean | null;
  canceled_at?: string | null;
  current_period_start?: string | null;
  current_period_end?: string | null;
  start_date?: string | null;
  ended_at?: string | null;
  trial_start?: string | null;
  trial_end?: string | null;
  items: Array<SubscriptionItem>;
}

export interface TenantPlansResponse {
  plans?: Array<Plan>;
  subscriptions?: Array<Subscription>;
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

export interface AuthToken {
  access_token: string;
}

export interface CreateAuthTokenRequestBody {
  user_id: string;
}

export interface Entitlement {}

export type UpdateEntitlementsRequestBody = Array<Entitlement>;

export interface UpdateTenantRequestBody {
  name: string;
}

export interface CreateTenantRequestBody {
  name: string;
  is_test: boolean;
  parent_tenant_id?: string | null;
}

export interface CreateTenantForUserRequestBody {
  name: string;
  is_test: boolean;
}

export interface TenantMember {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  is_test: boolean;
  parent_tenant_id?: string | null;
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
  parent_tenant_id?: string | null;
  entitlements?: Array<Entitlement> | null;
  metrics?: TenantMetrics | null;
}

export interface TenantMember {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  is_test: boolean;
  parent_tenant_id?: string | null;
  entitlements?: Array<Entitlement> | null;
  metrics?: TenantMetrics | null;
  scopes: Array<string>;
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
  child_tenant_count: number;
  question_count: number;
  answer_count: number;
  team_member_count: number;
  team_member_pending_invitation_count: number;
  user_count: number;
}

export interface UpdateTenantMetricsRequestBody {
  child_tenant_count?: number;
  answer_count?: number;
  question_count?: number;
  team_member_count?: number;
  team_member_pending_invitation_count?: number;
  user_count?: number;
}

export interface CreateTenantUserRequestBody {
  identity: string;
  name?: string | null;
  properties?: object | null;
}

export interface TenantUserStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  identity: string;
  name?: string | null;
}

export interface TenantUser {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  identity: string;
  name?: string | null;
  properties: object;
}

export interface TenantUserCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<TenantUserStub>;
}

export interface CreateApiKeyRequestBody {
  name: string;
  description?: string | null;
  is_public: boolean;
}

export interface ApiKey {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  is_public: boolean;
  tenant_id: string;
}

export interface ApiKeyWithSecretResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  is_public: boolean;
  tenant_id: string;
  secret?: string | null;
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
  code?: string;
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

export interface AnswerCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Answer>;
}

export interface UpdateAnalyticEventTypeRequestBody {
  description?: string | null;
}

export interface CreateAnalyticEventTypeRequestBody {
  description?: string | null;
  name: string;
}

export interface AnalyticEventType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name: string;
  description?: string | null;
  internal: boolean;
}

export interface AnalyticEventTypeCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<AnalyticEventType>;
}

export type AnalyticEventTypeListResponse = Array<AnalyticEventType>;

export interface UpdateAppAreaRequestBody {
  title: string;
  slug: string;
  description?: string | null;
}

export interface CreateAppAreaRequestBody {
  title: string;
  slug: string;
  description?: string | null;
}

export interface AppArea {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  title: string;
  slug: string;
  description?: string | null;
}

export interface AppAreaCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<AppArea>;
}

export type AppAreaListResponse = Array<AppArea>;

export enum CampaignStatus {
  active = 'active',
  paused = 'paused',
  draft = 'draft',
  scheduled = 'scheduled',
  complete = 'complete',
  closed = 'closed',
  archived = 'archived',
}

export interface UpdateCampaignRequestBody {
  name?: string;
  description?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  paused_at?: string | null;
  triggers?: UpdateCampaignTriggerList;
  actions?: UpdateCampaignActionList;
}

export interface CreateCampaignRequestBody {
  name?: string;
  description?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  paused_at?: string | null;
  triggers?: UpdateCampaignTriggerList;
  actions?: UpdateCampaignActionList;
}

export interface Campaign {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id: string;
  name: string;
  description?: string | null;
  published_at?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  paused_at?: string | null;
  closed_at?: string | null;
  status: CampaignStatus;
  triggers?: CampaignTriggerList;
  actions?: CampaignActionList;
}

export interface CampaignCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Campaign>;
}

export type CampaignListResponse = Array<Campaign>;

export interface UpdateCampaignTriggerRequestBody {
  type: string;
  analytic_event_type_id?: string | null;
}

export type UpdateCampaignTriggerList = Array<UpdateCampaignTriggerRequestBody>;

export interface CampaignTrigger {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  type: string;
  analytic_event_type_id?: string | null;
}

export type CampaignTriggerList = Array<CampaignTrigger>;

export enum CampaignActionType {
  question = 'question',
  notification = 'notification',
}

export enum CampaignActionDisplayType {
  popup = 'popup',
  inline = 'inline',
}

export interface UpdateCampaignActionRequestBody {
  type: CampaignActionType;
  notification_template_id?: string;
  question_id?: string;
  display_type?: CampaignActionDisplayType | null;
  app_area_id?: string | null;
}

export type UpdateCampaignActionList = Array<UpdateCampaignActionRequestBody>;

export interface CampaignAction {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  type: CampaignActionType;
  notification_template_id?: string;
  question_id?: string;
  display_type?: CampaignActionDisplayType | null;
  app_area_id?: string | null;
}

export type CampaignActionList = Array<CampaignAction>;

export interface UpdateFeedbackFormRequestBody {
  title: string;
  description?: string | null;
  data: FeedbackFormData;
}

export interface CreateFeedbackFormRequestBody {
  title: string;
  description?: string | null;
  data: FeedbackFormData;
}

export interface FeedbackFormStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  title: string;
  description?: string | null;
}

export interface SubmitFeedbackFormResponseBody {}

export interface FeedbackFormSubmission {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  feedback_form_id: string;
  user_id: string;
  data: SubmitFeedbackFormResponseBody;
}

export interface FeedbackFormSubmissionCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<FeedbackFormSubmission>;
}

export interface FeedbackFormResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  title: string;
  description?: string | null;
  data: FeedbackFormData;
}

export interface FeedbackFormDataStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  data: FeedbackFormData;
}

export interface FeedbackFormData {
  title: string;
  description?: string | null;
  fields: Array<FeedbackFormField>;
}

export enum FeedbackFormFieldType {
  text = 'text',
  input = 'input',
  select = 'select',
}

export interface FeedbackFormField {
  name: string;
  title?: string;
  helper_text?: string;
  type: FeedbackFormFieldType;
  required?: boolean;
  data: FeedbackFormFieldData;
}

export type FeedbackFormFieldData =
  | FeedbackFormTextFieldData
  | FeedbackFormSelectFieldData
  | FeedbackFormInputFieldData;

export interface FeedbackFormTextFieldData {
  placeholder?: string;
  lines?: number;
  max_lines?: number;
  min_characters?: number;
  max_characters?: number;
  max_height?: number;
}

export interface FeedbackFormInputFieldData {
  placeholder?: string;
}

export interface FeedbackFormSelectFieldData {
  placeholder?: string;
  options: Array<FeedbackFormSelectFieldOption>;
}

export interface FeedbackFormSelectFieldOption {
  title: string;
  value: string;
  is_other?: boolean;
}

export interface FeedbackFormCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<FeedbackFormStub>;
}

export interface FeedbackMetrics {
  user_count: number;
  answer_count: number;
  question_count: number;
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
  campaign_id?: string | null;
  bucket_item_id?: string | null;
  data: AnswerData;
}

export interface AnswerQuestionBody {
  bucket_item_id?: string | null;
  data: AnswerData;
}

export interface BulkAnswerQuestionBody {
  question_id: string;
  bucket_item_id?: string | null;
  data: AnswerData;
}

export type BulkAnswerQuestionsBody = Array<BulkAnswerQuestionBody>;

export type CardItemData = Question;

export enum CardItemDisplayType {
  inline = 'inline',
  popup = 'popup',
}

export enum CardItemType {
  question = 'question',
}

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

export interface MutableChoiceQuestionBody {
  options: Array<MutableChoiceQuestionOption>;
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

export interface MutableCheckboxQuestionBody {
  options: Array<MutableCheckboxQuestionOption>;
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

export interface MutableImageQuestionBody {
  options: Array<MutableImageQuestionOption>;
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

export interface MutableRatingQuestionBody {
  options: Array<MutableRatingQuestionOption>;
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

export interface MutableStarQuestionBody {
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

export interface MutableShortTextQuestionBody {
  placeholder?: string | null;
  min_length?: number | null;
  max_length?: number | null;
}

export interface LongTextQuestionBody {
  placeholder?: string | null;
  min_length?: number | null;
  max_length?: number | null;
}

export interface MutableLongTextQuestionBody {
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

export interface MutableBooleanQuestionBody {
  options: Array<MutableBooleanQuestionOption>;
}

export type MutableQuestionData =
  | MutableChoiceQuestionBody
  | MutableCheckboxQuestionBody
  | MutableImageQuestionBody
  | MutableRatingQuestionBody
  | MutableStarQuestionBody
  | MutableShortTextQuestionBody
  | MutableLongTextQuestionBody
  | MutableBooleanQuestionBody;

export type QuestionData =
  | ChoiceQuestionBody
  | CheckboxQuestionBody
  | ImageQuestionBody
  | RatingQuestionBody
  | StarQuestionBody
  | ShortTextQuestionBody
  | LongTextQuestionBody
  | BooleanQuestionBody;

export interface UpdateQuestionRequestBody {
  title: string;
  subtitle?: string | null;
  data: MutableQuestionData;
}

export interface CreateQuestionRequestBody {
  title: string;
  subtitle?: string | null;
  data: MutableQuestionData;
  type: QuestionType;
  kind: QuestionKind;
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

export interface QuestionCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Question>;
}

export interface CreateQuestionMetricsRequestBody {
  campaign_id?: string | null;
}

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

export type QuestionMetricsData =
  | ChoiceQuestionMetricsBody
  | CheckboxQuestionMetricsBody
  | InageQuestionMetricsBody
  | RatingQuestionMetricsBody
  | StarQuestionMetricsBody
  | LongTextQuestionMetricsBody
  | ShortTextQuestionMetricsBody
  | BooleanQuestionMetricsBody;

export interface ChoiceQuestionMetricsBody {
  options: Array<ChoiceQuestionMetricsOption>;
}

export interface ChoiceQuestionMetricsOption {
  title: string;
  value: string;
  is_other?: boolean | null;
  id: string;
  answer_count: number;
}

export interface CheckboxQuestionMetricsBody {
  options: Array<CheckboxQuestionMetricsOption>;
}

export interface CheckboxQuestionMetricsOption {
  title: string;
  value: string;
  is_other?: boolean | null;
  id: string;
  answer_count: number;
}

export interface InageQuestionMetricsBody {
  options: Array<ImageQuestionMetricsOption>;
}

export interface ImageQuestionMetricsOption {
  image_asset_id: string;
  title?: string | null;
  value: string;
  id: string;
  image_asset_url: string;
  answer_count: number;
}

export interface RatingQuestionMetricsBody {
  average_rating: number;
  options: Array<RatingQuestionMetricsOption>;
}

export interface RatingQuestionMetricsOption {
  title: string;
  value: number;
  id: string;
  answer_count: number;
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

export interface StarQuestionMetricsBody {
  average_rating: number;
  options: Array<StarQuestionMetricsOption>;
}

export interface StarQuestionMetricsOption {
  title: string;
  value: number;
  id: string;
  answer_count: number;
}

export interface ShortTextQuestionMetricsBody {}

export interface LongTextQuestionMetricsBody {}

export interface BooleanQuestionMetricsBody {
  average_rating: number;
  options: Array<BooleanQuestionMetricsOption>;
}

export interface BooleanQuestionMetricsOption {
  title: string;
  value: string;
  id: string;
  answer_count: number;
}

export interface Event {
  name: string;
  created_at: string | null;
  metadata?: object | null;
}

export interface Session {
  started_at?: string | null;
  ended_at?: string | null;
  user_properties?: object | null;
  events?: Array<Event>;
}

export interface ReportSessionResponse {
  should_poll: boolean;
  retry_delay: number;
  retry_times: number;
}

export interface UpdateTemplateRequestBody {
  description?: string | null;
}

export interface CreateTemplateRequestBody {
  description?: string | null;
  title: string;
}

export enum TemplateType {
  question = 'question',
}

export interface TemplateStub {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id?: string | null;
  question_id?: string | null;
  title: string;
  description?: string | null;
  type: TemplateType;
}

export interface Template {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  tenant_id?: string | null;
  question_id?: string | null;
  title: string;
  description?: string | null;
  type: TemplateType;
  question?: Question;
}

export interface TemplateCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Template>;
}

export type TemplateResponse = Array<Template>;

export interface UpdateTemplateTagRequestBody {
  description?: string | null;
}

export interface CreateTemplateTagRequestBody {
  description?: string | null;
  title: string;
}

export interface TemplateTag {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  title: string;
  description?: string | null;
  template_count: number;
}

export interface TemplateTagCollectionMetadata {
  total_template_count: number;
}

export interface TemplateTagCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<TemplateTag>;
  metadata?: TemplateTagCollectionMetadata;
}

export interface UpdateApplicationRequestBody {
  name: string;
  description?: string | null;
}

export interface CreateApplicationRequestBody {
  name: string;
  description?: string | null;
  type: ApplicationType;
}

export enum ApplicationType {
  ios = 'ios',
}

export interface Application {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  type: ApplicationType;
  tenant_id: string;
  apns?: ApnsConfiguration | null;
}

export interface ApplicationCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<Application>;
}

export type ApplicationListResponse = Array<Application>;

export enum ApnsEnvironment {
  production = 'production',
  sandbox = 'sandbox',
}

export enum ApnsPushType {
  alert = 'alert',
  background = 'background',
  complication = 'complication',
  fileprovider = 'fileprovider',
  liveactivity = 'liveactivity',
  location = 'location',
  pushtotalk = 'pushtotalk',
  voip = 'voip',
  mdm = 'mdm',
}

export interface UpdateApnsChannelRequestBody {
  application_id: string;
  environment: ApnsEnvironment;
  push_type: ApnsPushType;
  expiration?: string | null;
  collapse_id?: string | null;
  priority?: number;
  payload: object;
}

export interface CreateApnsChannelRequestBody {
  application_id: string;
  environment: ApnsEnvironment;
  push_type: ApnsPushType;
  expiration?: string | null;
  collapse_id?: string | null;
  priority?: number;
  payload: object;
}

export interface ApnsChannel {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  application_id: string;
  environment: ApnsEnvironment;
  push_type: ApnsPushType;
  expiration?: string | null;
  collapse_id?: string | null;
  priority?: number;
  payload: object;
}

export interface UpdateInboxChannelRequestBody {
  title: string;
  description?: string | null;
}

export interface CreateInboxChannelRequestBody {
  title: string;
  description?: string | null;
}

export interface InboxChannel {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  title: string;
  description?: string | null;
}

export interface InboxItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  title: string;
  description?: string;
  read: boolean;
  read_at?: string | null;
}

export interface ReadInboxItemsRequestBody {
  item_ids: Array<string>;
}

export interface InboxItemCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<InboxItem>;
}

export interface UpdateApnsConfigurationRequestBody {
  name: string;
  description?: string | null;
  bundle_id: string;
  team_id: string;
  key_id: string;
  key: string;
}

export interface ApnsConfiguration {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  bundle_id: string;
  team_id: string;
  key_id: string;
  key: string;
}

export enum ChannelType {
  apns = 'apns',
  inbox = 'inbox',
}

export interface UpdateChannelRequestBody {
  name: string;
  description?: string | null;
  apns?: UpdateApnsChannelRequestBody;
  inbox?: UpdateInboxChannelRequestBody;
}

export interface CreateChannelRequestBody {
  type: ChannelType;
  name: string;
  description?: string | null;
  apns?: CreateApnsChannelRequestBody;
  inbox?: CreateInboxChannelRequestBody;
}

export interface Channel {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  type: ChannelType;
  name: string;
  description?: string | null;
  apns?: CreateApnsChannelRequestBody;
  inbox?: CreateInboxChannelRequestBody;
}

export interface CreateDeviceRequestBody {
  platform: string;
  platform_agent: string;
  device_id?: string | null;
  bundle_id?: string | null;
  ad_id?: string | null;
  manufacturer?: string | null;
  model?: string | null;
}

export interface UpdateNotificationTemplateRequestBody {
  name: string;
  description?: string | null;
}

export interface CreateNotificationTemplateRequestBody {
  name: string;
  description?: string | null;
}

export interface NotificationTemplate {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  description?: string | null;
  tenant_id: string;
  channels?: Array<Channel> | null;
}

export interface NotificationTemplateCollectionResponse {
  page: number;
  page_count: number;
  page_size: number;
  total_count: number;
  data: Array<NotificationTemplate>;
}

export type NotificationTemplateListResponse = Array<NotificationTemplate>;

export interface NotificationRecipient {
  user_id?: string;
  data?: object | null;
}

export interface SendNotificationApnsChannelOverrides {
  expiration?: string | null;
  collapse_id?: string | null;
  priority?: number;
}

export interface SendNotificationInboxChannelOverrides {
  title?: string;
  description?: string | null;
}

export interface SendNotificationChannels {
  apns?: SendNotificationApnsChannelOverrides;
  inbox?: SendNotificationInboxChannelOverrides;
}

export interface SendNotificationForTemplateRequestBody {
  recipients: Array<NotificationRecipient>;
  data?: object | null;
  channels?: SendNotificationChannels;
}

export interface CreatePushTokenRequestBody {
  type: string;
  token: string;
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
  identities?: Array<CreateIdentityRequestBody>;
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

export interface CheckAuthorization {
  allowed: boolean;
}

export interface UserInfoResponse {
  roles?: Array<string>;
  user?: UserResponse | null;
  tenant_user?: TenantUser | null;
}

class ParraAPI {
  constructor(private http: HTTPClient, private options: { baseUrl: string }) {}

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

  getCards = (query?: { app_area_id?: string }): Promise<CardsResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/cards`, {
      method: 'get',
      query,
    });
  };

  getFormById = (feedback_form_id: string): Promise<FeedbackFormDataStub> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/feedback/forms/${feedback_form_id}`,
      {
        method: 'get',
      }
    );
  };

  submitFormById = (
    feedback_form_id: string,
    body?: SubmitFeedbackFormResponseBody
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
      }
    );
  };

  createMetricsForQuestionById = (
    question_id: string,
    body?: CreateQuestionMetricsRequestBody
  ): Promise<QuestionMetrics> => {
    return this.http.execute(
      `${this.options.baseUrl}/v1/questions/${question_id}/metrics`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
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

  getUserInfo = (): Promise<UserInfoResponse> => {
    return this.http.execute(`${this.options.baseUrl}/v1/user-info`, {
      method: 'get',
    });
  };
}

export default ParraAPI;
