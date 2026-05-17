
CREATE TABLE public.atletas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero INTEGER NOT NULL,
  nome TEXT NOT NULL,
  posicao TEXT,
  setor TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  email TEXT,
  telefone TEXT,
  data_nascimento DATE,
  altura INTEGER,
  peso_atual NUMERIC(5,2),
  foto_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.historico_peso (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  peso NUMERIC(5,2) NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_historico_peso_atleta ON public.historico_peso(atleta_id, data DESC);

CREATE TABLE public.avaliacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  nota INTEGER NOT NULL CHECK (nota >= 0 AND nota <= 100),
  presenca NUMERIC(5,2) NOT NULL DEFAULT 0,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_avaliacoes_atleta ON public.avaliacoes(atleta_id, data DESC);

ALTER TABLE public.atletas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_peso ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "open_all_atletas" ON public.atletas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all_historico_peso" ON public.historico_peso FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all_avaliacoes" ON public.avaliacoes FOR ALL USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER atletas_set_updated_at BEFORE UPDATE ON public.atletas
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
