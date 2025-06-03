using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();

    if (!database.Quilts.Any())
    {
      database.Quilts.Add(new Quilt("Flower", "/website/pages/pic/bant.png",5,1));
      // database.Quilts.Add(new Quilt("Feather", "/website/images/tel_aviv.jpg"));
      //  database.Quilts.Add(new Quilt("Cat", "/website/images/tel_aviv.jpg"));

      database.Users.Add(new User("00000", "Admin", "1234"));
       database.Groups.Add(new Group("nature"));



      database.SaveChanges();
    }





    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
          /*──────────────────────────────────╮
          │ Handle your custome requests here │
          ╰──────────────────────────────────*/
          if (request.Path == "signUp")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var userExists = database.Users.Any(user =>
              user.Username == username
            );

            if (!userExists)
            {
              var userId = Guid.NewGuid().ToString();
              database.Users.Add(new User(userId, username, password));
              response.Send(userId);
            }
          }
          else if (request.Path == "logIn")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var user = database.Users.First(
              user => user.Username == username && user.Password == password
            );

            var userId = user.Id;

            response.Send(userId);
          }
          else if (request.Path == "getUsername")
          {
            var userId = request.GetBody<string>();

            var username = database.Users.Find(userId)?.Username;

            response.Send(username);
          }
          else if (request.Path == "getQuilts")
          {
            var quilts = database.Quilts.ToArray();

            response.Send(quilts);

          }
          else if (request.Path == "addQuilt")
          {
            var (title, imageSource, price, groupId) =
              request.GetBody<(string, string, int, int)>();

            var quilt = new Quilt(title, imageSource, price, groupId);

            database.Quilts.Add(quilt);
          }
          else if (request.Path == "addtocart")
          {
            var (productId, userId) =
              request.GetBody<(int, string)>();

            var wishproduct = new WishProduct(productId, userId);

            database.WishProducts.Add(wishproduct);
          }
          else if (request.Path == "removeFromCart")
          {
            var (productId, userId) = request.GetBody<(int, string)>();

            var wishproduct = database.WishProducts.First(
              wishproduct => wishproduct.UserId == userId && wishproduct.ProductId == productId
            );

            database.WishProducts.Remove(wishproduct);
          }
        

          else if (request.Path == "getCart")
          {
            var wishproducts = database.WishProducts.ToArray();
            var userId = request.GetBody<string>();

            var userQuilts = database.WishProducts.Where(userQuilt => userQuilt.UserId == userId)
              .ToArray();

            response.Send(userQuilts);
          }
          else if (request.Path == "CreateGroup")
          {
            var name =
            request.GetBody<string>();

            var group = new Group(name);

            database.Groups.Add(group);
          }

          else if (request.Path == "getGroups")
          {
            var groups = database.Groups.ToArray();

            response.Send(groups);
          }


          else
          {
            response.SetStatusCode(405);
          }

          database.SaveChanges();

        }

        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }

      response.Close();
    }
  }
}




class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<User> Users { get; set; } = default!;
  public DbSet<Quilt> Quilts { get; set; } = default!;

   public DbSet<Group> Groups { get; set; } = default!;

  public DbSet<WishProduct> WishProducts { get; set; } = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Quilt(string name, string image, int price, int groupId )
{
  [Key] public int Id { get; set; } = default!;
  public string Name { get; set; } = name;
  public string Image { get; set; } = image;
  public int Price { get; set; } = price;
  public int GroupId { get; set; } = groupId;
[ForeignKey("GroupId")] public Group Group { get; set; } = default!;
 }

class WishProduct(int productId, string userId)
{
  [Key] public int Id { get; set; } = default!;
  public int ProductId { get; set; } = productId;
  [ForeignKey("ProductId")] public Quilt Quilt { get; set; } = default!;
  public string UserId { get; set; } = userId;
  [ForeignKey("UserId")] public User User { get; set; } = default!;


}

 class Group(string name)
 {
   [Key] public int Id { get; set; } = default!;
  public string Name { get; set; } = name;
 }
