import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpIn() {
  return (
    <section className="py-16 bg-beige-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Join Our Community</h2>
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Choose your role and get started with HomeCook.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline">Sign up as Customer</Button>
                    <Button variant="outline">Sign up as Chef</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Create Account</Button>
                  <Button variant="outline" className="w-full">
                    Continue with Google
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Sign in to your HomeCook account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Sign In</Button>
                  <Button variant="outline" className="w-full">
                    Continue with Google
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

