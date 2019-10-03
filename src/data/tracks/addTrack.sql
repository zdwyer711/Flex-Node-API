declare @oid nchar(10)
declare @title NVARCHAR(MAX)
declare @artist NVARCHAR(MAX)
declare @track_id nchar(10)
INSERT INTO [FlexTest].[dbo].[tracks]
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

SELECT SCOPE_IDENTITY() AS oid;
