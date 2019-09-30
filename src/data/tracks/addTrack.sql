INSERT INTO [dbo].[tracks]
(
   [oid]
   ,[title]
   ,[artist]
   ,[track_id]
)
VALUES
(
   @oid
   , @title
   , @artist
   , @track_id
);

SELECT SCOPE_IDENTITY() AS id;
