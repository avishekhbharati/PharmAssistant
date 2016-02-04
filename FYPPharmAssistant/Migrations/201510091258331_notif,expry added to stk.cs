namespace FYPPharmAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class notifexpryaddedtostk : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stock", "ItemExpired", c => c.Boolean(nullable: false, defaultValue: false));
            AddColumn("dbo.Stock", "Stop_Notification", c => c.Boolean(nullable: false, defaultValue: true));
            
        }
        
        public override void Down()
        {
            
        }
    }
}
