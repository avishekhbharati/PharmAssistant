namespace FYPPharmAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userIDadded : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Sales", "UserID", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Sales", "UserID", c => c.Int());
        }
    }
}
