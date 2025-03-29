import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Wiki() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Notes App</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Notes App is a simple note-taking application that helps you
                write down your thoughts and create daily entries. it's designed
                to make note-taking effortless and enjoyable.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <Card>
            <CardContent className="pt-6">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Sign in using your google account or email address</li>
                <li>Create a new note or daily note</li>
                <li>Write your content using the rich text editor</li>
                <li>Save your notes</li>
                <li>Access your notes from anywhere, anytime</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>Rich text editing with markdown support</li>
                <li>Many unique theme options</li>
                <li>Daily notes for journaling</li>
                <li>Simple and clean interface</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
