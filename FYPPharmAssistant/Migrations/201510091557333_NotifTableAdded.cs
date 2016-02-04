namespace FYPPharmAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NotifTableAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Notification",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        LowStock = c.Int(nullable: false, defaultValue:0),
                        ToExpire = c.Int(nullable: false, defaultValue: 0),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Notification");
        }
    }
}
