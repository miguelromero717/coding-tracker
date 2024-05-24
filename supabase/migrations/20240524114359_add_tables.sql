create table if not exists users (
  user_id uuid primary key default gen_random_uuid(),
  auth_id uuid unique not null,
  created_at timestamp default now() not null
);

create type question_provider as enum ('LEET_CODE', 'HACKER_RANK', 'CODE_SIGNAL', 'GEEKS_FOR_GEEKS', 'OTHER');
create type question_difficulty as enum ('EASY', 'MEDIUM', 'HARD');

create table if not exists questions(
    id bigserial primary key,
    name text not null,
    provider question_provider not null,
    difficulty question_difficulty not null,
    tags text[],
    user_id uuid references users(user_id) not null
);

create table if not exists question_attempts(
    id bigserial primary key,
    question_id bigint references questions(id) not null,
    date timestamp default now() not null,
    time_taken interval,
    notes text,
    active_recall text,
    next_attempt timestamp
);
