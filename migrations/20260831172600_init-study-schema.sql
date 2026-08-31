-- User Study Progress
CREATE TABLE IF NOT EXISTS public.user_study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  user_email TEXT,
  user_name TEXT,
  completed_topics JSONB DEFAULT '[]'::jsonb,
  bookmarked_topics JSONB DEFAULT '[]'::jsonb,
  mastered_flashcards JSONB DEFAULT '[]'::jsonb,
  difficult_flashcards JSONB DEFAULT '[]'::jsonb,
  failed_questions JSONB DEFAULT '[]'::jsonb,
  last_visited_topic TEXT DEFAULT '01',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Exam Results
CREATE TABLE IF NOT EXISTS public.exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL DEFAULT 'oficial',
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  wrong_topic_ids JSONB DEFAULT '[]'::jsonb,
  wrong_questions JSONB DEFAULT '[]'::jsonb,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_study_progress_user_id ON public.user_study_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_created_at ON public.exam_results(created_at DESC);

-- Enable RLS
ALTER TABLE public.user_study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT ALL ON TABLE public.user_study_progress TO authenticated, anon;
GRANT ALL ON TABLE public.exam_results TO authenticated, anon;

-- RLS Policies
CREATE POLICY "Users can manage own study progress"
  ON public.user_study_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own exam results"
  ON public.exam_results
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
