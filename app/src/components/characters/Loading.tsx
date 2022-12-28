import React from "react"

export default function Loading () {
    return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'center',
                margin: '0 auto',
              }}
            >
              <h3>Loading...</h3>
              <img
                style={{ width: '6rem', height: '3rem' }}
                src="https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif"
              />
            </div>
    )
}