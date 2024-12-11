FROM oven/bun:latest

COPY . .

RUN bun install

CMD [ "/bin/bash", "-c", "cat > inputs/${DAY}.txt && bun task ${DAY}-${PART}" ]
