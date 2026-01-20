-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;

-- Create a more secure policy that still allows public inserts
-- but adds basic validation (ensures required fields are provided and have reasonable values)
CREATE POLICY "Public can create reservations with valid data" 
ON public.reservations 
FOR INSERT 
WITH CHECK (
  -- Ensure name is not empty
  length(trim(name)) > 0
  -- Ensure email has basic format
  AND email ~ '^[^@]+@[^@]+\.[^@]+$'
  -- Ensure phone is not empty
  AND length(trim(phone)) > 0
  -- Ensure guests count is reasonable (1-20)
  AND guests >= 1 AND guests <= 20
  -- Ensure reservation date is today or in the future
  AND reservation_date >= CURRENT_DATE
  -- Ensure status is pending for new reservations
  AND status = 'pending'
);