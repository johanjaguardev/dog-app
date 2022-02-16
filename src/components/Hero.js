const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero__info'>
        <h2>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      </div>
      <div className="hero__video-box">
        <iframe className="hero__videos" width="100%" height="100%" src="https://www.youtube.com/embed/VqUeo5SRMx4" allowfullscreen></iframe>
      </div>
    </div>
  )

}

export { Hero }

