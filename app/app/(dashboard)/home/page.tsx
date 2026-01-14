'use client';

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="app-hero p-10">
        <h1 className="text-5xl font-extrabold">Welcome to the Home Page</h1>
        <p className="mt-3 text-lg">
          This is the home page of the Elevate application. Use the sidebar to navigate to different sections.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Available APIs</h2>
        
        <div className="app-card p-6">
          <h3 className="text-xl font-semibold mb-2">Italian Jokes API</h3>
          <p className="app-muted">Fetches random Italian jokes with type and subtype classification.</p>
        </div>

        <div className="app-card p-6">
          <h3 className="text-xl font-semibold mb-2">Harry Potter API</h3>
          <p className="app-muted">Access data about Harry Potter books, characters, and spells with search functionality.</p>
        </div>

        <div className="app-card p-6">
          <h3 className="text-xl font-semibold mb-2">Employees API</h3>
          <p className="app-muted">Manage employees with CRUD operations. Create, read, update, and delete employee records.</p>
        </div>
      </section>
    </div>
  );
}
