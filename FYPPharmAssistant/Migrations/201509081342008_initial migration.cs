namespace FYPPharmAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialmigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DrugGenericName",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        GenericName = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Item",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        DrugGenericNameID = c.Int(),
                        ManufacturerID = c.Int(),
                        Categeory = c.Int(),
                        UnitType = c.Int(nullable: false),
                        Weight = c.Decimal(precision: 18, scale: 2),
                        MeasurementID = c.Int(nullable: false),
                        AlertQty = c.Int(nullable: false),
                        Description = c.String(),
                        LastUpdated = c.DateTime(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.DrugGenericName", t => t.DrugGenericNameID)
                .ForeignKey("dbo.Manufacturer", t => t.ManufacturerID)
                .Index(t => t.DrugGenericNameID)
                .Index(t => t.ManufacturerID);
            
            CreateTable(
                "dbo.Manufacturer",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ManufacturerName = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Item", "ManufacturerID", "dbo.Manufacturer");
            DropForeignKey("dbo.Item", "DrugGenericNameID", "dbo.DrugGenericName");
            DropIndex("dbo.Item", new[] { "ManufacturerID" });
            DropIndex("dbo.Item", new[] { "DrugGenericNameID" });
            DropTable("dbo.Manufacturer");
            DropTable("dbo.Item");
            DropTable("dbo.DrugGenericName");
        }
    }
}
