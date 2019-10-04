UPDATE  [FlexTest].[dbo].[tracks]
SET     [title] = @title
       , [artist] = @artist
       , [track_id] = track_id
WHERE   [oid] = @oid

SELECT  [oid]
       , [title]
       , [artist]
       , [track_id]
FROM    [FlexTest].[dbo].[tracks]
WHERE   [oid] = @oid
