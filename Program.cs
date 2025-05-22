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
      database.Quilts.Add(new Quilt("Flower", "website/pages/pic/bant.png","5"));
      // database.Quilts.Add(new Quilt("Feather", "/website/images/tel_aviv.jpg"));
      //  database.Quilts.Add(new Quilt("Cat", "/website/images/tel_aviv.jpg"));

      database.Users.Add(new User("00000", "Admin", "1234"));



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
            var (title, imageSource, price) =
              request.GetBody<(string, string, string)>();

            var quilt = new Quilt(title, imageSource, price);

            database.Quilts.Add(quilt);
          }
          else if(request.Path=="addtocart")
          {
            
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
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Quilt(string name, string image, string price)
{
  [Key] public int Id { get; set; } = default!;
  public string Name { get; set; } = name;
  public string Image { get; set; } = image;
  public string Price { get; set; } = price;
}

class WishProduct(string productId, string userId)
{
  [Key] public int Id { get; set; } = default!;
  public string ProductId { get; set; } = productId;
  public string UserId { get; set; } = userId;
}
