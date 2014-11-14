/*~
-- DATABASE INITIALIZATION -----------------------------------------------------
--
-- The following code performs the initial setup of the PostgreSQL database with
-- required objects for the anchor database.
--
--------------------------------------------------------------------------------

-- SEQUENCE - public.bigint ----------------------------------------------------
--
-- This sequence is used throughout for identity columns in the database. With
-- PostgreSQL, each time the cache is exhausted for a sequence a write is made
-- to the disk. One sequence with a large cache seems to perform extremely well.
--
--------------------------------------------------------------------------------

DO
DECLARE $$$$
  _kind ""char"";
BEGIN
  SELECT INTO _kind   c.relkind
  FROM   pg_class     c
  JOIN   pg_namespace n ON n.oid = c.relnamespace
  WHERE  c.relname   = 'seq_bigint'
  AND    n.namespace = 'public';

  IF NOT FOUND THEN
    CREATE SEQUENCE public.seq_bigint
      INCREMENT BY 1
      MINVALUE    -9223372036854775807
      MAXVALUE    +9223372036854775806
      START WITH  1
      CACHE       10000
      CYCLE;
  ELSIF _kind = 'S' THEN
    SELECT 'Sequence public.seq_bigint already exists';
  ELSE
    SELECT 'Name conflict with another object and public.seq_bigint';
  END IF;
END
$$$$;

~*/
